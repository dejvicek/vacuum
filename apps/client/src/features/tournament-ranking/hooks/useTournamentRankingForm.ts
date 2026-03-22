import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useFormWithSidebar } from '../../../hooks/useFormWithSidebar';

export const TOURNAMENT_RANKING_FORM_PLAYERS_COUNT = 16;

export type TournamentRankingEntryFormData = {
  playerId: number;
  rank: number;
};

export type TournamentRankingFormData = {
  rankingEntries: TournamentRankingEntryFormData[];
};

export const useTournamentRankingForm = () => {
  const { t } = useTranslation();

  const entrySchema = z.object({
    playerId: z.coerce.number().int().min(1, t('tournamentRanking.errors.player_required')),
    rank: z.coerce
      .number()
      .int()
      .min(1, t('tournamentRanking.errors.rank_required'))
      .max(8, t('tournamentRanking.errors.rank_max')),
  });

  const schema = z.object({
    rankingEntries: z.array(entrySchema),
  });

  const defaultEntries = Array.from({ length: TOURNAMENT_RANKING_FORM_PLAYERS_COUNT }, (_, index) => ({
    playerId: 0,
    rank: Math.floor(index / 2) + 1,
  }));

  return useFormWithSidebar<TournamentRankingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      rankingEntries: defaultEntries,
    },
  });
};
