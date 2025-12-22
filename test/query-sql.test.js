import { prismaClient } from '../src/prisma-client';

describe('Prisma Client', () => {
    it('should be able to query SQL', async () => {
        const id = "1";
        
        const samples = await prismaClient.$queryRaw`SELECT * FROM sample WHERE id = ${id}`; //return berupa array of object
        for (const sample of samples) {
            console.info(`Sample ID: ${sample.id}, Name: ${sample.name}`);
        }
    });
});