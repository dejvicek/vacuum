export interface Player {
  id: number;
  nick_name: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

export interface CreatePlayer {
  nick_name: string;
  first_name: string | null;
  last_name: string | null;
}
