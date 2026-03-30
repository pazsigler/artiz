import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma v7: adapter is configured at runtime when connecting to a real DB.
// For now, create a client instance that will be configured when Supabase is set up.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({} as never);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
