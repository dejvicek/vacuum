import { client } from "..";
import { Tables } from "../database.types";

export type Player = Tables<"player">;

export const getPlayers = async () =>
  await client.from("player").select().order("nick_name");
