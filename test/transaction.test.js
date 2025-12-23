import { prismaClient } from '../src/prisma-client.js';

// Semua operasi di dalam transaction harus berhasil semuanya, atau gagal semuanya.
// Tidak boleh setengah-setengah.
//Jika ada 5 query di dalam transaction, dan query ke-4 gagal → query 1–3 dibatalkan
//Transaction yang berjalan bersamaan tidak saling mengganggu
/*
Terhindar dari data tidak konsisten, contoh tanpa transaction:
customer1 berhasil
customer2 gagal (misalnya email duplicate)

➡️ customer1 sudah terlanjur masuk database
➡️ Data jadi tidak konsisten
*/

describe('Prisma Client', () => {
    it('Should can execute sequential transaction', async () => {
        const [customer1, customer2] = await prismaClient.$transaction([
            prismaClient.customer.create({
                data: {
                    id: "2",
                    name: "Clark Kent",
                    email: "clark.kent@example.com",
                    phone: "0987654321"
                }
            }),
            prismaClient.customer.create({
                data: {
                    id: "3",
                    name: "Diana Prince",
                    email: "diana.prince@example.com",
                    phone: "0923456789"
                }
            })
        ]);

        expect(customer1.name).toBe("Clark Kent");
        expect(customer2.name).toBe("Diana Prince");
    });

    it('Should can execute interactive transaction', async () => {
        const [customer1, customer2] = await prismaClient.$transaction(async (prisma) => {
            const customer1 = await prisma.customer.create({
                data: {
                    id: "2",
                    name: "Clark Kent",
                    email: "clark.kent@example.com",
                    phone: "0987654321"
                }
            });

            const customer2 = await prisma.customer.create({
                data: {
                    id: "3",
                    name: "Diana Prince",
                    email: "diana.prince@example.com",
                    phone: "0923456789"
                }
            });

            return [customer1, customer2];
        });

        expect(customer1.name).toBe("Clark Kent");
        expect(customer2.name).toBe("Diana Prince");
    });
});