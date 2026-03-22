import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useSidebarContext } from '@/contexts/useSidebarContext';
import { usePlayerForm, PlayerFormData } from '@/hooks/useForms/usePlayerForm';
import { createPlayer, Player } from '@/api/player';
import { ActionButton } from './action-button';

type Props = {
  player?: Player | null;
};

export const PlayerForm: FC<Props> = ({ player }) => {
  const { handleCloseSidebar } = useSidebarContext();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = usePlayerForm(player);

  const onSubmit = async (data: PlayerFormData) => {
    try {
      if (player) {
        console.log('Editing player:', data);
        // await updatePlayer(player.id, data);
        return;
      }
      await createPlayer(data);

      handleCloseSidebar();
    } catch (error) {
      console.error('Failed to save player:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10 text-start">
          <div className="mt-10 space-y-6">
            <div className="w-full">
              <label htmlFor="first_name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                {t('players.first_name')}
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  type="text"
                  autoComplete="given-name"
                  {...register('first_name')}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.first_name.message}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="last_name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                {t('players.last_name')}
              </label>
              <div className="mt-2">
                <input
                  id="last_name"
                  type="text"
                  autoComplete="family-name"
                  {...register('last_name')}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="nick_name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                {t('players.nick_name')}
              </label>
              <div className="mt-2">
                <input
                  id="nick_name"
                  type="text"
                  {...register('nick_name')}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {errors.nick_name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nick_name.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-baseline justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900 dark:text-white cursor-pointer"
          onClick={handleCloseSidebar}
        >
          {t('form.cancel')}
        </button>
        <ActionButton type="submit">{t('form.submit')}</ActionButton>
      </div>
    </form>
  );
};
