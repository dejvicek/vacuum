import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const TournamentRankingColumnsHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-[1fr_90px] items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      <span>{t('tournamentRanking.player')}</span>
      <span>{t('tournamentRanking.rank')}</span>
    </div>
  );
};
