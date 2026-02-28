import { PrismaService } from '../prisma.service';
export declare class DiscoveryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(filters: any): Promise<({
        property: {
            nearbyPOIs: {
                id: string;
                name: string;
                propertyId: string;
                type: string;
                distance: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string;
            latitude: number | null;
            longitude: number | null;
            ownerId: string;
            managerId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        roomNumber: string;
        price: number;
        status: import(".prisma/client").$Enums.RoomStatus;
        features: string[];
    })[]>;
    findOne(id: string): Promise<({
        property: {
            nearbyPOIs: {
                id: string;
                name: string;
                propertyId: string;
                type: string;
                distance: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string;
            latitude: number | null;
            longitude: number | null;
            ownerId: string;
            managerId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        propertyId: string;
        roomNumber: string;
        price: number;
        status: import(".prisma/client").$Enums.RoomStatus;
        features: string[];
    }) | null>;
}
