
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

// Database Helper Function
export async function checkingDbConnection(): Promise<boolean> {
    try {
        await prismaClient.$queryRaw`SELECT 1`;
        return true;
    } catch (error) {
        console.error(`database failed to connect: ${error}`);
        return false;
    }
}
