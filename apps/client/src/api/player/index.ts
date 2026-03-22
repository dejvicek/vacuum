import { PlayerFormData } from '@/hooks/useForms/usePlayerForm';
import { Tables } from '../database.types';
import { fetchApi } from '../fetchApi';

export type Player = Tables<'player'>;

export const getPlayers = async (): Promise<Player[]> => fetchApi<Player[]>({ path: '/v1/public/player' });

export const createPlayer = async (payload: PlayerFormData): Promise<Player> =>
  fetchApi<Player>({
    path: '/v1/player',
    options: {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  });
