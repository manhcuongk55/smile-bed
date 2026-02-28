import { DiscoveryService } from './discovery.service';
export declare class DiscoveryController {
    private readonly discoveryService;
    constructor(discoveryService: DiscoveryService);
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
