'use client';

import { Player } from '@/api/player';
import { ColumnDef } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { Pencil } from 'lucide-react';

export const getColumns = (t: TFunction, onEdit: (player: Player) => void): ColumnDef<Player>[] => [
  {
    accessorKey: 'nick_name',
    header: t('players.nick_name'),
  },
  {
    accessorKey: 'first_name',
    header: t('players.first_name'),
  },
  {
    accessorKey: 'last_name',
    header: t('players.last_name'),
  },
  {
    id: 'edit',
    header: t('table.edit'),
    cell: ({ row: { original: player } }) => (
      <div className="flex justify-center">
        <button
          onClick={() => onEdit(player)}
          className="p-2 hover:bg-muted rounded-md transition-colors cursor-pointer"
          aria-label="Edit player"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];
