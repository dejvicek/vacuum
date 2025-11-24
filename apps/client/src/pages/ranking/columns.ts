'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TFunction } from 'i18next';
import { Ranking } from '../../api/ranking';

export const getColumns = (t: TFunction): ColumnDef<Ranking>[] => [
  {
    accessorKey: 'points',
    header: t('points'),
  },
  {
    accessorKey: 'nick_name',
    header: t('nick_name'),
  },
  {
    accessorKey: 'first_name',
    header: t('first_name'),
  },
  {
    accessorKey: 'last_name',
    header: t('last_name'),
  },
];
