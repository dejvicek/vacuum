'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { Ranking } from '../../api/ranking';

export const getColumns = (t: TFunction): ColumnDef<Ranking>[] => [
  {
    accessorKey: 'points',
    header: t('ranking.points'),
  },
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
];
