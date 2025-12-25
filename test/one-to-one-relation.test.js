import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => { 
    it('Should can to create one to one relation', async () => {
        const createdWallet = await prismaClient.wallet.create({
            data: {
                id: '2',
                customer_id: '2',
                balance: 1000000
            },
            include: {
                customer: true // Include the related customer
            }
        });

        console.info('Created Wallet with Customer:', createdWallet);
    });

    it('Should can to create one to one using relation', async () => {
        const createdCustomer = await prismaClient.customer.create({
            data: {
                id: 'aa-01',
                name: 'Felipe',
                email: 'felipe@example.com',
                phone: '029399999999',
                wallet: { //create wallet data
                    create: {
                        id: 'aa-01',
                        balance: 123000
                    }
                }
            },
            include: {
                wallet: true
            }
        });

        console.info('Created Customer with Wallet:', createdCustomer);
    });

    it('Should can find one to one with relation', async () => {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id: 'aa-01'
            },
            include: {
                wallet: true
            }
        });

        console.info('Customer with Wallet:', customer);
    });

    it('Should can find one to one with relation filter', async () => {
        const customers = await prismaClient.customer.findMany({
            where: {
                wallet: {
                    isNot: null //filter where wallet is not null
                }
            },
            include: {
                wallet: true
            }
        });

        console.info('Customer with Wallet:', customers);
    });
});