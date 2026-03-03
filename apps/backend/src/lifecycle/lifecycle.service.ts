import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LifecycleService {
    constructor(private prisma: PrismaService) { }

    // ── Invoices ────────────────────────────────────────
    async getInvoicesByContract(contractId: string) {
        return this.prisma.invoice.findMany({
            where: { contractId },
            include: { violations: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createInvoice(data: {
        contractId: string;
        period: string;
        electricityCost: number;
        waterCost: number;
        baseRent: number;
        serviceFee?: number;
        penaltyFee?: number;
    }) {
        const serviceFee = data.serviceFee || 0;
        const penaltyFee = data.penaltyFee || 0;
        const total = data.electricityCost + data.waterCost + data.baseRent + serviceFee + penaltyFee;
        return this.prisma.invoice.create({
            data: {
                contractId: data.contractId,
                period: data.period,
                electricityCost: data.electricityCost,
                waterCost: data.waterCost,
                baseRent: data.baseRent,
                serviceFee,
                penaltyFee,
                total,
            },
        });
    }

    async generateMonthlyInvoice(contractId: string, period: string) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: contractId },
            include: {
                room: { include: { property: true } },
                violations: { where: { invoiceId: null } },
            },
        });
        if (!contract) throw new NotFoundException('Hợp đồng không tồn tại.');

        // Get latest readings for utility calculation
        const readings = await this.prisma.reading.findMany({
            where: { roomId: contract.roomId },
            orderBy: { readingDate: 'desc' },
            take: 2,
        });

        let electricityCost = 0;
        let waterCost = 0;
        if (readings.length >= 2) {
            const elecDiff = readings[0].electricityReading - readings[1].electricityReading;
            const waterDiff = readings[0].waterReading - readings[1].waterReading;
            electricityCost = Math.max(0, elecDiff) * 3500; // 3,500đ/kWh
            waterCost = Math.max(0, waterDiff) * 25000; // 25,000đ/m³
        }

        // Calculate service fees
        const services = await this.prisma.service.findMany({
            where: { propertyId: contract.room.propertyId, frequency: 'MONTHLY' },
        });
        const serviceFee = services.reduce((sum, s) => sum + s.price, 0);

        // Calculate pending penalties
        const penaltyFee = contract.violations.reduce((sum, v) => sum + v.penaltyAmount, 0);

        const total = contract.rentAmount + electricityCost + waterCost + serviceFee + penaltyFee;

        const invoice = await this.prisma.invoice.create({
            data: {
                contractId,
                period,
                electricityCost,
                waterCost,
                baseRent: contract.rentAmount,
                serviceFee,
                penaltyFee,
                total,
            },
        });

        // Link violations to this invoice
        if (contract.violations.length > 0) {
            await this.prisma.violation.updateMany({
                where: { id: { in: contract.violations.map(v => v.id) } },
                data: { invoiceId: invoice.id },
            });
        }

        // Create transaction record
        await this.prisma.transaction.create({
            data: {
                contractId,
                type: 'RENT',
                amount: total,
                description: `Hóa đơn tháng ${period}`,
            },
        });

        return invoice;
    }

    async markInvoicePaid(invoiceId: string) {
        const invoice = await this.prisma.invoice.findUnique({ where: { id: invoiceId } });
        if (!invoice) throw new NotFoundException('Hóa đơn không tồn tại.');

        await this.prisma.transaction.create({
            data: {
                contractId: invoice.contractId,
                type: 'RENT',
                amount: invoice.total,
                description: `Thanh toán hóa đơn ${invoice.period}`,
                status: 'COMPLETED',
            },
        });

        return this.prisma.invoice.update({
            where: { id: invoiceId },
            data: { status: 'PAID' },
        });
    }

    // ── Contract Activation ─────────────────────────────
    async activateContract(contractId: string, cccdData?: {
        idCardNumber?: string;
        idCardFrontUrl?: string;
        idCardBackUrl?: string;
        emergencyContact?: string;
    }) {
        const contract = await this.prisma.contract.findUnique({
            where: { id: contractId },
            include: { tenant: true, room: true },
        });
        if (!contract) throw new NotFoundException('Hợp đồng không tồn tại.');

        // Update tenant CCCD info if provided
        if (cccdData) {
            await this.prisma.tenant.update({
                where: { id: contract.tenantId },
                data: {
                    idCardNumber: cccdData.idCardNumber || undefined,
                    idCardFrontUrl: cccdData.idCardFrontUrl || undefined,
                    idCardBackUrl: cccdData.idCardBackUrl || undefined,
                    emergencyContact: cccdData.emergencyContact || undefined,
                },
            });
        }

        // Activate contract
        const updated = await this.prisma.contract.update({
            where: { id: contractId },
            data: {
                status: 'ACTIVE',
                isActive: true,
                activatedAt: new Date(),
            },
            include: { tenant: true, room: true },
        });

        // Update room to occupied
        await this.prisma.room.update({
            where: { id: contract.roomId },
            data: { status: 'OCCUPIED' },
        });

        // Create deposit transaction
        await this.prisma.transaction.create({
            data: {
                contractId,
                type: 'DEPOSIT',
                amount: contract.depositAmount,
                description: 'Đặt cọc hợp đồng',
                status: 'COMPLETED',
            },
        });

        return updated;
    }

    // ── Violations & Rules ──────────────────────────────
    async addViolation(data: {
        contractId: string;
        tenantId: string;
        rule: string;
        description: string;
        penaltyAmount: number;
    }) {
        // Count previous violations for this rule
        const count = await this.prisma.violation.count({
            where: { contractId: data.contractId, rule: data.rule },
        });

        return this.prisma.violation.create({
            data: {
                ...data,
                occurrenceCount: count + 1,
            },
        });
    }

    async getViolations(contractId: string) {
        return this.prisma.violation.findMany({
            where: { contractId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getSOPRules() {
        // Return standard Smile Home SOP rules
        return [
            { id: 'R01', rule: 'Quên tắt điện khu vực chung', penalty: 50000, desc: 'Phải tắt đèn hành lang, cầu thang khi ra về (sau 23h)' },
            { id: 'R02', rule: 'Sử dụng sai bột giặt máy cửa trước', penalty: 100000, desc: 'Chỉ sử dụng bột giặt chuyên dụng cho máy giặt cửa trước' },
            { id: 'R03', rule: 'Gây ồn sau 22h', penalty: 100000, desc: 'Không phát nhạc lớn, la hét, hoặc gây tiếng ồn sau 22h' },
            { id: 'R04', rule: 'Hút thuốc trong phòng', penalty: 200000, desc: 'Nghiêm cấm hút thuốc trong phòng và khu vực chung' },
            { id: 'R05', rule: 'Nuôi thú cưng không phép', penalty: 200000, desc: 'Phải xin phép quản lý trước khi nuôi thú cưng' },
            { id: 'R06', rule: 'Vứt rác không đúng nơi', penalty: 50000, desc: 'Phân loại rác và vứt đúng vị trí quy định' },
            { id: 'R07', rule: 'Tự ý sửa chữa, cải tạo', penalty: 500000, desc: 'Mọi sửa chữa phải thông qua quản lý tòa nhà' },
            { id: 'R08', rule: 'Cho người lạ ở qua đêm', penalty: 200000, desc: 'Phải đăng ký khách ở qua đêm với quản lý' },
        ];
    }

    // ── Maintenance ─────────────────────────────────────
    async getMaintenanceByRoom(roomId: string) {
        return this.prisma.maintenanceRequest.findMany({
            where: { roomId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async createMaintenanceRequest(data: {
        roomId: string;
        tenantId: string;
        description: string;
        imageUrl?: string;
    }) {
        return this.prisma.maintenanceRequest.create({ data });
    }

    async updateMaintenanceStatus(id: string, status: 'IN_PROGRESS' | 'DONE') {
        return this.prisma.maintenanceRequest.update({
            where: { id },
            data: { status },
        });
    }

    // ── Meter Readings ──────────────────────────────────
    async addReading(data: {
        roomId: string;
        electricityReading: number;
        waterReading: number;
    }) {
        return this.prisma.reading.create({ data });
    }

    async getReadingsByRoom(roomId: string) {
        return this.prisma.reading.findMany({
            where: { roomId },
            orderBy: { readingDate: 'desc' },
            take: 12,
        });
    }
}
