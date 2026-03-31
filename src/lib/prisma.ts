import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  "";

// Remove sslmode=require and add sslmode=prefer to avoid self-signed cert error
const fixedUrl = connectionString.replace("sslmode=require", "sslmode=prefer");

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: fixedUrl }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
