import { prismaClient } from '../src/prisma-client.js';

describe('Prisama Client', () => { 
    it('Should can insert and include', async () => {
        const createdComment = await prismaClient.comment.create({
            data: {
                customer_id: '8',
                title: 'Comment Today',
                description: 'This is comment today',
            },
            include: {
                customer: true
            }
        });

        console.info('Created Comment: ', createdComment);
    });
    
    it('Should can insert and many relation', async () => {
        const createdCustomer = await prismaClient.customer.create({
            data: {
                id: 'aa-02',
                name: 'Robert',
                email: 'robert@example.com',
                phone: '0948923323',
                comments: {
                    createMany: {
                        data: [
                            { //tidak perlu insert customer_id karena sudah otomatis terisi dari id customer
                                title: 'Comment 121',
                                description: 'This is comment 121',
                            },
                            {
                                title: 'Comment 122',
                                description: 'This is comment 122',
                            }
                        ]
                    }
                }
            },
            include: {
                comments: true
            }
        });

        console.info('Created Customer: ', createdCustomer);
    });

    it('Should can find many with filter relation', async () => {
        const customers = await prismaClient.customer.findMany({
            where: { //filter beradasarkan relasi comments dimana ada comment dengan title mengandung Comment 12
                comments: {
                    some: {
                        title: {
                            contains: 'Comment 1'
                        }
                    }
                }
            }, 
            include: {
                comments: true
            }
        });

        console.info('Customers: ', customers);
    });
});