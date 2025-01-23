import { FC } from "react";
import { usePlayersQuery } from "../../hooks/usePlayersQuery";
import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/data-table";
import { getColumns } from "./columns";

export const PlayersPage: FC = () => {
  const { data, isSuccess } = usePlayersQuery();
  const { t } = useTranslation(undefined, { keyPrefix: "players" });

  if (!isSuccess) return t("loading");

  const { data: playersData } = data;

  return (
    <div className="container mx-auto py-10 min-w-192">
      <DataTable columns={getColumns(t)} data={playersData ?? []} />
    </div>
  );
};
