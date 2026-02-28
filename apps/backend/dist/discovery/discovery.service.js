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
exports.DiscoveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DiscoveryService = class DiscoveryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filters) {
        const { minPrice, maxPrice, location, verifiedOnly } = filters;
        return this.prisma.room.findMany({
            where: {
                price: {
                    gte: minPrice ? parseFloat(minPrice) : undefined,
                    lte: maxPrice ? parseFloat(maxPrice) : undefined,
                },
                status: 'AVAILABLE',
                property: {
                    address: location ? { contains: location, mode: 'insensitive' } : undefined,
                    owner: verifiedOnly === 'true' ? { role: 'PROPERTY_OWNER' } : undefined,
                },
            },
            include: {
                property: {
                    include: {
                        nearbyPOIs: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        return this.prisma.room.findUnique({
            where: { id },
            include: {
                property: {
                    include: {
                        nearbyPOIs: true,
                    },
                },
            },
        });
    }
};
exports.DiscoveryService = DiscoveryService;
exports.DiscoveryService = DiscoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiscoveryService);
//# sourceMappingURL=discovery.service.js.map