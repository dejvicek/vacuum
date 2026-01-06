import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useRankingQuery } from '@/hooks/useRankingQuery';
import { getColumns } from './columns';
import { DataTable } from '@/components/data-table';

export const RankingPage: FC = () => {
  const { data, isSuccess } = useRankingQuery('2024-09-30', '2024-12-31');
  const { t } = useTranslation(undefined, { keyPrefix: 'ranking' });

  if (!isSuccess) return t('loading');

  return (
    <div className="container mx-auto py-10 lg:max-w-192">
      <DataTable columns={getColumns(t)} data={data ?? []} />
    </div>
  );
};
