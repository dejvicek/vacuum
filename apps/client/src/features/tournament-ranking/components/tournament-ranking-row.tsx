import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Player } from '@/api/player';
import { TournamentRankingFormData } from '@/features/tournament-ranking/hooks/useTournamentRankingForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

type Props = {
  rowIndex: number;
  availablePlayers: Player[];
};

export const TournamentRankingRow: FC<Props> = ({ rowIndex, availablePlayers }) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: {
      errors: { rankingEntries },
    },
  } = useFormContext<TournamentRankingFormData>();

  return (
    <div className="grid grid-cols-[1fr_90px] items-start gap-2">
      <div>
        <Controller
          name={`rankingEntries.${rowIndex}.playerId`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select value={value > 0 ? String(value) : undefined} onValueChange={(value) => onChange(Number(value))}>
              <SelectTrigger id={`playerId-${rowIndex}`} className="w-full">
                <SelectValue placeholder={t('tournamentRanking.select_player_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {availablePlayers.map(({ id, nick_name }) => (
                  <SelectItem key={id} value={String(id)}>
                    {nick_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {rankingEntries?.[rowIndex]?.playerId && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{rankingEntries[rowIndex]?.playerId?.message}</p>
        )}
      </div>

      <div>
        <input
          id={`rank-${rowIndex}`}
          type="number"
          min={1}
          max={8}
          {...register(`rankingEntries.${rowIndex}.rank`, {
            valueAsNumber: true,
          })}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
        />

        {rankingEntries?.[rowIndex]?.rank && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{rankingEntries[rowIndex]?.rank?.message}</p>
        )}
      </div>
    </div>
  );
};
