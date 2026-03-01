import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'owner@smilebed.ai' },
        update: {},
        create: {
            email: 'owner@smilebed.ai',
            password: 'password123',
            role: 'PROPERTY_OWNER',
            firstName: 'Smile',
            lastName: 'Owner',
        },
    })

    // Create property
    const property = await prisma.property.create({
        data: {
            name: 'smile-bed Landmark 81',
            address: '720A Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh',
            latitude: 10.7946,
            longitude: 106.7214,
            ownerId: user.id,
            nearbyPOIs: {
                create: [
                    { name: 'Ga Metro Tân Cảng', type: 'transit', distance: 0.5 },
                    { name: 'Vincom Center', type: 'mall', distance: 0.1 },
                ]
            }
        }
    })

    // Create room
    await prisma.room.create({
        data: {
            propertyId: property.id,
            roomNumber: 'P.402',
            price: 8500000,
            status: 'AVAILABLE',
            features: '["wifi", "ac", "kitchen", "balcony"]', // Changed string[] to string for SQLite compatibility if needed, but wait! SQLite does not support String[].
        }
    })

    console.log('Database seeded!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
