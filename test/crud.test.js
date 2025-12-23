import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => { 
    it('should be able to create customers data', async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '1234567890'
            }
        });

        expect(customer.id).toBe('1');
        expect(customer.name).toBe('John Doe');
        expect(customer.email).toBe('john.doe@example.com');
        expect(customer.phone).toBe('1234567890');
    });

    it('should be able to update customers data', async () => {
        const customer = await prismaClient.customer.update({
            data: {
                name: 'John Doe Clark', //data yang di update
            },
            where: {
                id: '1', //data yang di cari
            }
        });

        expect(customer.name).toBe('John Doe Clark');
    });

    it('should be able to read customers data', async () => {
        const customer = await prismaClient.customer.findUnique({ //find berdasarkan unique column
            where: {
                id: '1',
            }
        });

        expect(customer.id).toBe('1');
        expect(customer.name).toBe('John Doe Clark');
        expect(customer.email).toBe('john.doe@example.com');
        expect(customer.phone).toBe('1234567890');
    });

    it('should be able to delete customers data', async () => {
        const customer = await prismaClient.customer.delete({
            where: {
                id: '1',
            }
        });

        expect(customer.id).toBe('1');
        expect(customer.name).toBe('John Doe Clark');
        expect(customer.email).toBe('john.doe@example.com');
        expect(customer.phone).toBe('1234567890');
    });
});