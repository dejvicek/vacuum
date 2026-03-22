import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useRankingQuery } from '@/hooks/useRankingQuery';
import { getColumns } from './columns';
import { DataTable } from '@/components/data-table';
import { ActionButton } from '@/components/action-button';
import { useSidebarContext } from '@/contexts/useSidebarContext';
import { TournamentRankingSidebar } from '@/features/tournament-ranking/components/tournament-ranking-sidebar';

export const RankingPage: FC = () => {
  const { data, isSuccess } = useRankingQuery('2024-09-30', '2024-12-31');
  const { t } = useTranslation();
  const { openSidebar, isOpen } = useSidebarContext();

  const handleOpenTournamentRankingForm = () =>
    openSidebar(t('action_buttons.enter_score'), <TournamentRankingSidebar />);

  if (!isSuccess) return t('ranking.loading');

  return (
    <div className="container mx-auto py-10 lg:max-w-3xl flex flex-col items-end">
      <ActionButton disabled={isOpen} handleClick={handleOpenTournamentRankingForm}>
        {t('action_buttons.enter_score')}
      </ActionButton>
      <DataTable columns={getColumns(t)} data={data ?? []} />
    </div>
  );
};
