import { createContext } from 'react';
import { User } from '@prisma/client';

export const Authentication = createContext<User | null>(null);
