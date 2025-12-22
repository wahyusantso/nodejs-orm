import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient({
    // create prisma client with mariadb adapter
    adapter: new PrismaMariaDb({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        connectionLimit: 5
    }),
    errorFormat: 'pretty',
    log: ['query', 'info', 'warn', 'error'], //kategori log yang di tampilkan
});