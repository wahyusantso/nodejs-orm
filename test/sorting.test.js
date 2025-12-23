import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => { 
    it('Should can do sorting', async () => {
        //sorting digunakan untuk mengurutkan data berdasarkan satu atau lebih field (orderBy)
        const customers = await prismaClient.customer.findMany({
            orderBy: [
                {
                    id: 'desc'
                },
                {
                    email: 'asc'
                }
            ],
            take: 10,
            skip: 0
        });

        console.info(customers);
    });
});