import 'dotenv/config';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
});

// Satu instance PrismaClient dipakai bersama oleh seluruh aplikasi
export const prisma = new PrismaClient({ adapter });
