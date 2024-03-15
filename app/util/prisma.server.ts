// modified from https://github.com/remix-run/indie-stack/blob/main/app/db.server.ts

import { PrismaClient } from '@prisma/client';

import { singleton } from './singleton.server';

// hard-code a unique key, so we can look up the client when this module gets re-imported
export const prisma = singleton('prisma', () => new PrismaClient());

prisma.$connect();
