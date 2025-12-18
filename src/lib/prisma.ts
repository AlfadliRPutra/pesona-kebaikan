import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaClient: PrismaClient;

if (process.env.PRISMA_ACCELERATE_URL) {
	prismaClient = new PrismaClient({
		accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
		log: ["query"],
	});
} else {
	const connectionString = `${process.env.DATABASE_URL}`;
	const pool = new Pool({ connectionString });
	const adapter = new PrismaPg(pool);

	prismaClient = new PrismaClient({
		adapter,
		log: ["query"],
	});
}

export const prisma = globalForPrisma.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
