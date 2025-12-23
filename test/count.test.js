import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => {
    it('Should can count records in the customer table', async () => {
        const total = await prismaClient.customer.count({
            where: {
                name: 'Rudi latif'
            }
        });

        expect(total).toBe(2);
    });
});