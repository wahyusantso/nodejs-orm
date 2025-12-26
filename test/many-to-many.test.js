import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => { 
    it('Should can insert many-to-many relations', async () => {
        const createdLike = await prismaClient.like.create({
            data: {
                customer_id: '3',
                product_id: 'aa-001'
            },
            include: {
                customer: true,
                product: true
            }
        });

        console.info('Created Like:', createdLike);
    });

    it('Should can find one with many-to-many relations', async () => {
        const findCustomer = await prismaClient.customer.findUnique({
            where: {
                id: '2'
            },
            include: { // ambil juga data likes dan product yang di-like
                likes: {
                    include: {
                        product: true
                    }
                }
            }
        });

        console.info('Customer with Likes:', JSON.stringify(findCustomer));
    });

    it('Should can find many with many-to-many relations', async () => {
        const findCustomer = await prismaClient.customer.findMany({
            where: { // filter customer yang memiliki like ke product dengan nama mengandung 'Product 1'
                likes: {
                    some: {
                        product: {
                            name:{
                                contains: 'Product 1'
                            }
                        }
                    }
                }
            },
            include: {
                likes: {
                    include: {
                        product: true
                    }
                }
            }
        });

        console.info('Customer with Likes:', JSON.stringify(findCustomer));
    });

    it('Should create implisit relation', async () => {
        const customer = await prismaClient.customer.update({
            where: {
                id: '5'
            },
            data: { //update data loves dengan menghubungkan data customer ke product yang sudah ada
                loves: {
                    connect: [
                        { id: 'aa-001' },
                        { id: 'aa-002' }
                    ]
                }
            },
            include: {
                loves: true
            }
        });

        console.info('Customer loves products:', customer);
    });

    it('Should find many implisit relation', async () => {
        const customer = await prismaClient.customer.findMany({
            where: {
                loves: {
                    some: {
                        name: {
                            contains: 'Product'
                        }
                    }
                }
            },
            include: {
                loves: true
            }
        });

        console.info('Customer loves products:', customer);
    });

    it('Should can create customer and products with interactive transaction and define relations', async () => {
        const createdCustomer = await prismaClient.$transaction(async (prisma) => {
            await prisma.customer.create({
                data: {
                    id: 'cs-005',
                    name: 'Andrews',
                    email: 'and@example.con',
                    phone: '08323442390'
                }
            });

            //tidak init ke variabel karena createMany tidak mengembalikan record
            await prisma.product.createMany({
                data: [
                    { id: 'P005', name: 'Product 005', price: 10000, stock: 10, category: 'Category E' },
                    { id: 'P006', name: 'Product 006', price: 20000, stock: 20, category: 'Category F' }
                ]
            });

            //define relation
            const customer = await prisma.customer.update({
                where: { id: 'cs-005' },
                data: {
                    loves: {
                        connect: [
                            { id: 'P005' },
                            { id: 'P006' }
                        ]
                    }
                },
                include: {
                    loves: true
                }
            });

            return customer;
        });

        console.info('Customer loves products:', createdCustomer);
    });
});