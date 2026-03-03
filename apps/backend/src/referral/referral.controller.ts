import { Controller, Get, Post, Param, Req, UseGuards, Ip } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReferralService } from './referral.service';

@Controller('referral')
export class ReferralController {
    constructor(private readonly referralService: ReferralService) { }

    /**
     * GET /referral/my-code
     * Get or create the logged-in user's referral code
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('my-code')
    async getMyCode(@Req() req: any) {
        return this.referralService.getOrCreateCode(req.user.sub || req.user.id);
    }

    /**
     * POST /referral/track/:code
     * Public endpoint – track a referral link click
     */
    @Post('track/:code')
    async trackClick(@Param('code') code: string, @Ip() ip: string) {
        return this.referralService.trackClick(code, ip);
    }

    /**
     * GET /referral/stats
     * Get referral dashboard stats for the logged-in user
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('stats')
    async getStats(@Req() req: any) {
        return this.referralService.getStats(req.user.sub || req.user.id);
    }

    /**
     * GET /referral/commissions
     * Get commission payout history
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('commissions')
    async getCommissions(@Req() req: any) {
        return this.referralService.getCommissionHistory(req.user.sub || req.user.id);
    }
}
