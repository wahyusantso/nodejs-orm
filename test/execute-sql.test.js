import { prismaClient } from '../src/prisma-client';

describe('Prisma Client', () => {
    it('should be able to execute SQL queries', async () => {
        const id = "1";
        const name = "Test User";

        const impacted = await prismaClient.$executeRaw`INSERT INTO sample (id, name) VALUES (${id}, ${name})`;
        expect(impacted).toBe(1); // Assuming one row is inserted
    });
});