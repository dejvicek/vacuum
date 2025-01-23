"use client";

import { Player } from "@/api/player";
import { ColumnDef } from "@tanstack/react-table";
import { TFunction } from "i18next";

export const getColumns = (t: TFunction): ColumnDef<Player>[] => [
  {
    accessorKey: "nick_name",
    header: t("nick_name"),
  },
  {
    accessorKey: "first_name",
    header: t("first_name"),
  },
  {
    accessorKey: "last_name",
    header: t("last_name"),
  },
];
