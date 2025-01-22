import { FC } from "react";
import { usePlayersQuery } from "../hooks/usePlayersQuery";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";

export const PlayersPage: FC = () => {
  const { data, isSuccess } = usePlayersQuery();
  const { t } = useTranslation(undefined, { keyPrefix: "players" });

  if (!isSuccess) return t("loading");

  const { data: players } = data;

  return (
    <Table>
      <TableCaption>{t("title")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{t("nick_name")}</TableHead>
          <TableHead>{t("first_name")}</TableHead>
          <TableHead>{t("last_name")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players?.map(({ first_name, last_name, nick_name }) => (
          <TableRow key={nick_name}>
            <TableCell className="font-medium">{nick_name}</TableCell>
            <TableCell>{first_name}</TableCell>
            <TableCell>{last_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
