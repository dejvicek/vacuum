import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useRankingQuery } from '../../hooks/useRankingQuery';
import { getColumns } from './columns';
import { DataTable } from '@/components/data-table';

export const RankingPage: FC = () => {
  const { data, isSuccess } = useRankingQuery();
  const { t } = useTranslation(undefined, { keyPrefix: 'ranking' });

  if (!isSuccess) return t('loading');

  const { data: rankingData } = data;

  return (
    <div className="container mx-auto py-10 min-w-192">
      <DataTable columns={getColumns(t)} data={rankingData ?? []} />
    </div>
  );
};
