import { ArrayType } from '@/lib/utils.ts';
import { Database } from '../database.types';
import { fetchApi } from '../fetchApi';

export type Ranking = ArrayType<Database['public']['Functions']['get_rankings_between_dates']['Returns']>;

export const getRanking = async (fromDate: string, toDate: string): Promise<Ranking[]> => {
  return fetchApi<Ranking[]>({
    path: `/v1/public/ranking?fromDate=${encodeURIComponent(fromDate)}&toDate=${encodeURIComponent(toDate)}`,
  });
};
