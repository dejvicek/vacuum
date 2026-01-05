export interface Ranking {
  id: number;
  player_id: number;
  nick_name: string | null;
  first_name: string | null;
  last_name: string | null;
  total_score: number | null;
  total_victories: number | null;
  total_defeats: number | null;
  total_matches: number | null;
  win_rate: number | null;
  average_score: number | null;
}
