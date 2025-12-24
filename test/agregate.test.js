import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => {
    it('Should be able to agregate products', async () => {
        const result = await prismaClient.product.aggregate({
            _min: {
                price: true,
            },
            _max: {
                price: true,
            },
            _avg: {
                price: true,
            },
            _count: {
                stock: true,
            },
            _sum: {
                price: true,
            },
        });

        console.info(result);
        expect(result._min.price).toBe(1000);
        expect(result._max.price).toBe(5000);
        expect(result._avg.price).toBe(3000);
    });

    it('Should do agregate products with group by', async () => {
        const result = await prismaClient.product.groupBy({
            by: ['category'],
            _sum: {
                price: true,
            },
        });

        console.info(result);
        expect(result[0]._sum.price).toBe(8000);
        expect(result[1]._sum.price).toBe(7000);
    });

    it('Should do agregate products with group by and having', async () => {
        const result = await prismaClient.product.groupBy({
            by: ['category'],
            _sum: {
                price: true,
            },
            having: {
                price: {
                    _min: {
                        gt: 2000, // greater than 2000. minimal price yang lebih dari 2000 akan diambil
                    }
                }
            }
        });

        console.info(result);
    });
});