import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => {
    it('Should can using or operator', async () => {
        const products = await prismaClient.product.findMany({
            where: {
                OR: [
                    {
                        name: "B"
                    },
                    {
                        name: "D"
                    }
                ]
            },
            orderBy: {
                name: 'desc'
            }
        });

        console.log(products);
    });
});