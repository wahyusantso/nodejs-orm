import { prismaClient } from '../src/prisma-client.js';

describe('Prisma Client', () => {
    it('Should can create many records', async () => {
        //return berupa jumlah data yang berhasil dibuat
        //createMany sama seperti transaction, jika ada satu data yang gagal maka semua data gagal dibuat
        const { count } = await prismaClient.customer.createMany({
            data: [
                {
                    id: '6',
                    name: 'Cliayton',
                    email: 'clayton@example.com',
                    phone: '038763231'
                },
                {
                    id: '7',
                    name: 'Larck',
                    email: 'larck@example.com',
                    phone: '03870148372'
                }
            ]
        });

        expect(count).toBe(2);
    });

    it('Should can update many records', async () => {
        //memperbarui banyak data sekaligus, tetapi hanya bisa berdasarkan kondisi yang sama
        const { count } = await prismaClient.customer.updateMany({
            data: {
                email: 'rudi.latif@example.com'
            },
            where: {
                name: 'Rudi latif'
            }
        });

        expect(count).toBe(2);
    });

    it('Should can delete many records', async () => {
        //menghapus banyak data sekaligus berdasarkan kondisi yang sama
        const { count } = await prismaClient.customer.deleteMany({
            where: {
                name: 'Sueb'
            }
        });

        expect(count).toBe(0);
    });

    it('Should can read many records', async () => {
        const customers = await prismaClient.customer.findMany({});

        expect(customers.length).toBe(6);
    });
});