import { ArrayType } from '@/lib/utils.ts';
import { Database } from '../database.types';

export type Ranking = ArrayType<
  Database['public']['Functions']['get_rankings_between_dates']['Returns']
>;

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getRanking = async (
  fromDate: string,
  toDate: string,
): Promise<Ranking[]> => {
  const response = await fetch(
    `${API_BASE_URL}/v1/public/ranking?fromDate=${fromDate}&toDate=${toDate}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch rankings: ${response.statusText}`);
  }

  return response.json();
};
