import { client } from "..";

export const getPlayers = async () => await client.from("player").select();
