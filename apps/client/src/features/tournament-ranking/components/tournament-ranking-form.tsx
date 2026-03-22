import { FC } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import {
  TOURNAMENT_RANKING_FORM_PLAYERS_COUNT,
  TournamentRankingFormData,
} from '@/features/tournament-ranking/hooks/useTournamentRankingForm';
import { Player } from '@/api/player';
import { TournamentRankingColumnsHeader } from './tournament-ranking-columns-header';
import { TournamentRankingRow } from './tournament-ranking-row';
import { TournamentRankingFooter } from './tournament-ranking-footer';

type Props = {
  availablePlayers: Player[];
  onSubmit: SubmitHandler<TournamentRankingFormData>;
  onAddPlayer?: () => void;
  onCancel: () => void;
};

export const TournamentRankingForm: FC<Props> = ({ availablePlayers, onSubmit, onAddPlayer, onCancel }) => {
  const {
    handleSubmit,
    formState: { errors: {rankingEntries} },
  } = useFormContext<TournamentRankingFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6 text-start pb-4">
        <TournamentRankingColumnsHeader />

        <div className="space-y-2">
          {Array.from({ length: TOURNAMENT_RANKING_FORM_PLAYERS_COUNT }, (_, rowIndex) => (
            <TournamentRankingRow key={rowIndex} rowIndex={rowIndex} availablePlayers={availablePlayers} />
          ))}

          {rankingEntries?.message && (
            <p className="text-sm text-red-600 dark:text-red-400">{rankingEntries.message}</p>
          )}
        </div>
      </div>

      <TournamentRankingFooter onAddPlayer={onAddPlayer} onCancel={onCancel} />
    </form>
  );
};
