import { fetchApi } from "@/api/fetchApi";

export type CreateTournamentRankingPayload = {
  playerId: number;
  rank: number;
};

export type TournamentRankingEntry = {
  id: number;
  playerId: number;
  rank: number;
  tournamentId: number;
  created_at: string;
};

export const createTournamentRanking = async (
  payload: CreateTournamentRankingPayload[]
): Promise<TournamentRankingEntry[]> =>
  fetchApi({
    path: '/v1/tournament-ranking',
    options: {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  });
