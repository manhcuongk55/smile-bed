import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReferralService {
    constructor(private prisma: PrismaService) { }

    /**
     * Generate a unique referral code string
     */
    private generateCodeString(): string {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `SMILE-${result}`;
    }

    /**
     * Get or create a referral code for the authenticated user
     */
    async getOrCreateCode(userId: string) {
        const existing = await this.prisma.referralCode.findUnique({
            where: { userId },
        });

        if (existing) return existing;

        // Generate unique code (retry on collision)
        let code: string;
        let attempts = 0;
        do {
            code = this.generateCodeString();
            const exists = await this.prisma.referralCode.findUnique({ where: { code } });
            if (!exists) break;
            attempts++;
        } while (attempts < 10);

        return this.prisma.referralCode.create({
            data: {
                code,
                userId,
            },
        });
    }

    /**
     * Track a click on a referral link (public endpoint)
     */
    async trackClick(code: string, ipAddress?: string) {
        const referralCode = await this.prisma.referralCode.findUnique({
            where: { code },
        });

        if (!referralCode || !referralCode.isActive) {
            throw new NotFoundException('Mã giới thiệu không tồn tại hoặc đã hết hiệu lực.');
        }

        // Increment click count
        await this.prisma.referralCode.update({
            where: { id: referralCode.id },
            data: { totalClicks: { increment: 1 } },
        });

        // Create conversion record with CLICKED status
        const conversion = await this.prisma.referralConversion.create({
            data: {
                referralCodeId: referralCode.id,
                status: 'CLICKED',
                ipAddress: ipAddress || null,
            },
        });

        return { tracked: true, conversionId: conversion.id };
    }

    /**
     * Convert a referral: upgrade CLICKED → BOOKED with commission
     */
    async convertReferral(code: string, referredUserId: string, contractId: string, contractAmount: number) {
        const referralCode = await this.prisma.referralCode.findUnique({
            where: { code },
            include: { conversions: { where: { status: 'CLICKED' }, take: 1, orderBy: { createdAt: 'desc' } } },
        });

        if (!referralCode) {
            throw new NotFoundException('Mã giới thiệu không tồn tại.');
        }

        // Find the latest CLICKED conversion or create a new one
        const conversion = referralCode.conversions[0];
        if (!conversion) return null;

        const commissionRate = conversion.commissionRate;
        const commissionAmount = contractAmount * commissionRate;

        // Update conversion to BOOKED
        const updated = await this.prisma.referralConversion.update({
            where: { id: conversion.id },
            data: {
                status: 'BOOKED',
                referredUserId,
                contractId,
                commissionAmount,
            },
        });

        // Create a pending payout
        await this.prisma.commissionPayout.create({
            data: {
                conversionId: updated.id,
                amount: commissionAmount,
                status: 'PENDING',
            },
        });

        return updated;
    }

    /**
     * Get referral stats for the authenticated user
     */
    async getStats(userId: string) {
        const referralCode = await this.prisma.referralCode.findUnique({
            where: { userId },
            include: {
                conversions: {
                    include: { payouts: true },
                },
            },
        });

        if (!referralCode) {
            return {
                code: null,
                totalClicks: 0,
                totalConversions: 0,
                totalCommission: 0,
                pendingCommission: 0,
                paidCommission: 0,
                conversions: [],
            };
        }

        const conversions = referralCode.conversions;
        const bookedConversions = conversions.filter(c => c.status === 'BOOKED' || c.status === 'COMMISSIONED');
        const totalCommission = bookedConversions.reduce((sum, c) => sum + (c.commissionAmount || 0), 0);

        const allPayouts = conversions.flatMap(c => c.payouts);
        const paidCommission = allPayouts
            .filter(p => p.status === 'PAID')
            .reduce((sum, p) => sum + p.amount, 0);
        const pendingCommission = allPayouts
            .filter(p => p.status === 'PENDING' || p.status === 'APPROVED')
            .reduce((sum, p) => sum + p.amount, 0);

        return {
            code: referralCode.code,
            isActive: referralCode.isActive,
            totalClicks: referralCode.totalClicks,
            totalConversions: bookedConversions.length,
            totalCommission,
            pendingCommission,
            paidCommission,
            recentConversions: bookedConversions.slice(0, 10).map(c => ({
                id: c.id,
                status: c.status,
                commissionAmount: c.commissionAmount,
                createdAt: c.createdAt,
            })),
        };
    }

    /**
     * Get commission payout history for the authenticated user
     */
    async getCommissionHistory(userId: string) {
        const referralCode = await this.prisma.referralCode.findUnique({
            where: { userId },
        });

        if (!referralCode) return [];

        const conversions = await this.prisma.referralConversion.findMany({
            where: { referralCodeId: referralCode.id },
            include: { payouts: true },
            orderBy: { createdAt: 'desc' },
        });

        return conversions
            .filter(c => c.commissionAmount && c.commissionAmount > 0)
            .map(c => ({
                id: c.id,
                status: c.status,
                commissionAmount: c.commissionAmount,
                commissionRate: c.commissionRate,
                contractId: c.contractId,
                createdAt: c.createdAt,
                payouts: c.payouts.map(p => ({
                    id: p.id,
                    amount: p.amount,
                    status: p.status,
                    paidAt: p.paidAt,
                })),
            }));
    }
}
