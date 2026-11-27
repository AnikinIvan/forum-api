import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json';
import { config } from '../config';

export const db = postgres<Contract>({
	contractJson,
	url: config.databaseUrl!,
});
