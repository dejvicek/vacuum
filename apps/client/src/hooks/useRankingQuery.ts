import { useQuery } from '@tanstack/react-query';
import { getRanking } from '@/api/ranking';

export const useRankingQuery = (fromDate: string, toDate: string) =>
  useQuery({
    queryKey: ['ranking'],
    queryFn: () => getRanking(fromDate, toDate),
  });
