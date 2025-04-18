import { client } from "..";
import { ArrayType } from "../../lib/utils";
import { Database } from "../database.types";

export type Ranking = ArrayType<
  Database["public"]["Functions"]["get_rankings_between_dates"]["Returns"]
>;

export const getRanking = async () =>
  await client.rpc("get_rankings_between_dates", {
    from_date: "2024-09-30",
    to_date: "2024-12-31",
  });
