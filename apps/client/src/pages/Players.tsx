import { FC } from "react";
import { usePlayersQuery } from "../hooks/usePlayersQuery";

export const PlayersPage: FC = () => {
  const { data, isSuccess } = usePlayersQuery();

  if (!isSuccess) return "Načítám data hráčů...";

  return data.data?.map(({ first_name, last_name, nick_name }) => (
    <div>
      <div>{first_name}</div>
      <div>{last_name}</div>
      <div>{nick_name}</div>
    </div>
  ));
};
