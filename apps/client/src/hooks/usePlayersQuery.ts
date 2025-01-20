import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../api/player";

export const usePlayersQuery = () =>
  useQuery({ queryKey: ["players"], queryFn: getPlayers });
