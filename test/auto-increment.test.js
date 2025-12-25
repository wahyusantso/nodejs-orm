import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => { 
    it('Should be able to create with auto-increment primary key', async () => {
        const createdCategory = await prismaClient.categories.create({
            data: { //hanya menginsert name karena id auto increment
                name: 'Good Products',
            }
        });

        console.info('Created Category:', createdCategory);
        expect(createdCategory).toHaveProperty('id');
    });
});