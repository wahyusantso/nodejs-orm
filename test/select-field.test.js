import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => {
    it('Should be able to create and select a record', async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: '8',
                name: 'SvelteKit',
                email: 'svel@example.com',
                phone: '123450320'
            },
            select: { // column yang diambil
                name: true,
                email: true
            }
        });

        console.info('Created Customer:', customer);
        expect(customer.name).toBe('SvelteKit');
        expect(customer.email).toBe('svel@example.com');
        expect(customer.phone).toBeUndefined();
    });

    it('Should be able to select many records with specific fields', async () => {
        const customers = await prismaClient.customer.findMany({
            select: {
                id: true,
                name: true,
                phone: true
            }
        });

        for (const cust of customers) {
            console.info('Customer:', cust);
            expect(cust.id).toBeDefined();
            expect(cust.name).toBeDefined();
            expect(cust.phone).toBeDefined();
            expect(cust.email).toBeUndefined();
        }
    });
});