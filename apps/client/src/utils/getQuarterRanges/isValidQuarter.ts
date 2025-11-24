import { z } from 'zod';

const quarterSchema = z.number().int().min(0).max(3);

export const isValidQuarter = (quarter: number): boolean => quarterSchema.safeParse(quarter).success;
