import { FC } from 'react';
import { usePlayersQuery } from '@/hooks/usePlayersQuery';
import { useTranslation } from 'react-i18next';
import { DataTable } from '@/components/data-table';
import { getColumns } from './columns';

import { ActionButton } from '@/components/action-button';
import { useSidebarContext } from '@/contexts/useSidebarContext';
import { PlayerForm } from '@/components/player-form';
import { Player } from '@/api/player';

export const PlayersPage: FC = () => {
  const { t } = useTranslation();
  const { data: playersData, isSuccess } = usePlayersQuery();
  const { openSidebar, isOpen } = useSidebarContext();

  if (!isSuccess) return t('players.loading');

  const handleEdit = (player: Player) => openSidebar('Upravit hráče', <PlayerForm key={player.id} player={player} />);
  const handleAddNewPlayer = () => openSidebar(t('action_buttons.add_player'), <PlayerForm key="new" />);

  return (
    <div className="container mx-auto py-10 lg:max-w-3xl flex flex-col items-end overflow-x-hidden">
      <ActionButton disabled={isOpen} handleClick={handleAddNewPlayer}>
        {t('action_buttons.add_player')}
      </ActionButton>

      <DataTable columns={getColumns(t, handleEdit)} data={playersData ?? []} />
    </div>
  );
};
