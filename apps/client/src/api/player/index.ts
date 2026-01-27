import { Tables } from '../database.types';

export type Player = Tables<'player'>;

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getPlayers = async (): Promise<Player[]> => {
  const response = await fetch(`${API_BASE_URL}/v1/public/player`);

  if (!response.ok) {
    throw new Error(`Failed to fetch players: ${response.statusText}`);
  }

  return response.json();
};
