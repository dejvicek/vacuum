import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { ActionButton } from '@/components/action-button';
import { useTranslation } from 'react-i18next';
import { TournamentRankingFormData } from '@/features/tournament-ranking/hooks/useTournamentRankingForm';

type Props = {
  onAddPlayer?: () => void;
  onCancel: () => void;
};

export const TournamentRankingFooter: FC<Props> = ({ onAddPlayer, onCancel }) => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<TournamentRankingFormData>();

  return (
    <div className="sticky -bottom-4 z-20 -mx-4 -mb-4 border-t bg-muted px-4 py-3 shadow-[0_-8px_18px_rgba(0,0,0,0.28)]">
      <button type="button" onClick={onAddPlayer} className="text-sm underline underline-offset-2 cursor-pointer">
        {t('action_buttons.add_player')}
      </button>

      <div className="mt-3 flex items-baseline justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900 dark:text-white cursor-pointer"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t('form.cancel')}
        </button>

        <ActionButton  type="submit" disabled={isSubmitting}>
          {t('tournamentRanking.submit')}
        </ActionButton>
      </div>
    </div>
  );
};
