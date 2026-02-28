"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BookingService = class BookingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBooking(tenantId, roomId, data) {
        const room = await this.prisma.room.findUnique({ where: { id: roomId } });
        if (!room || room.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Phòng không khả dụng.');
        }
        return this.prisma.$transaction(async (tx) => {
            const tenant = await tx.tenant.upsert({
                where: { userId: tenantId },
                update: {},
                create: {
                    userId: tenantId,
                    deposit: room.price,
                },
            });
            const contract = await tx.contract.create({
                data: {
                    tenantId: tenant.id,
                    roomId: room.id,
                    startDate: new Date(data.moveInDate),
                    endDate: data.endDate ? new Date(data.endDate) : new Date(new Date(data.moveInDate).setFullYear(new Date(data.moveInDate).getFullYear() + 1)),
                    rentAmount: room.price,
                    depositAmount: room.price,
                    status: 'PENDING',
                },
            });
            await tx.room.update({
                where: { id: room.id },
                data: { status: 'RESERVED' },
            });
            return contract;
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
//# sourceMappingURL=booking.service.js.map