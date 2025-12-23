import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => { 
    it('Should can do paging with skip and take', async () => {
        //paging digunakan untuk mengambil data dalam jumlah tertentu dengan melewati sejumlah data awal
        //skip digunakan untuk melewati sejumlah data awal
        //take digunakan untuk mengambil sejumlah data setelah melewati data awal
        const page1 = await prismaClient.customer.findMany({
            skip: 0,
            take: 1
        });

        const page2 = await prismaClient.customer.findMany({
            skip: 1,
            take: 1
        });

        const page3 = await prismaClient.customer.findMany({
            skip: 2,
            take: 1
        });

        console.info(page1, page2, page3);
        expect((page1.length == 1) && (page2.length == 1) && (page3.length == 1)).toBeTruthy;
    });
});