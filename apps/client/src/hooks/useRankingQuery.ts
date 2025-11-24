import { useQuery } from '@tanstack/react-query';
import { getRanking } from '../api/ranking';

export const useRankingQuery = () => useQuery({ queryKey: ['ranking'], queryFn: getRanking });
