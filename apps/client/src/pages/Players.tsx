import { FC } from "react";
import { usePlayersQuery } from "../hooks/usePlayersQuery";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const PlayersPage: FC = () => {
  const { data, isSuccess } = usePlayersQuery();

  if (!isSuccess) return "Načítám data hráčů...";

  const { data: players } = data;

  return (
    <Table>
      <TableCaption>Seznam hráčů.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Přezdívka</TableHead>
          <TableHead>Jméno</TableHead>
          <TableHead>Příjmení</TableHead>
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
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Celkem</TableCell>
          <TableCell className="text-right">{players?.length} hráčů</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
