import { PrismaClient } from "@/lib/generated/prisma"

declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined
}

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
  })
}

export const db = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db