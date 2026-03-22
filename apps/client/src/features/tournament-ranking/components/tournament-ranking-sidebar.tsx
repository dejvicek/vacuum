import { FC, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useSidebarContext } from '@/contexts/useSidebarContext';
import { createPlayer } from '@/api/player';
import { createTournamentRanking } from '@/features/tournament-ranking/api/create-tournament-ranking';
import { PlayerFormData } from '@/hooks/useForms/usePlayerForm';
import { usePlayersQuery } from '@/hooks/usePlayersQuery';
import { TournamentRankingFormData, useTournamentRankingForm } from '@/features/tournament-ranking/hooks/useTournamentRankingForm';
import { TournamentRankingForm } from './tournament-ranking-form';
import { PlayerForm } from '@/components/player-form';

const SIDEBAR_VIEW = {
  TOURNAMENT_RANKING: 'tournamentRanking',
  PLAYER: 'player',
} as const;

const { PLAYER, TOURNAMENT_RANKING } = SIDEBAR_VIEW;

type SidebarView = (typeof SIDEBAR_VIEW)[keyof typeof SIDEBAR_VIEW];

export const TournamentRankingSidebar: FC = () => {
  const queryClient = useQueryClient();
  const { handleCloseSidebar } = useSidebarContext();
  const { data: playersData = [] } = usePlayersQuery();
  const form = useTournamentRankingForm();

  const [view, setView] = useState<SidebarView>(TOURNAMENT_RANKING);

  const handleCreatePlayer = async (data: PlayerFormData) => {
    await createPlayer(data);
    await queryClient.invalidateQueries({ queryKey: ['players'] });

    setView(TOURNAMENT_RANKING);
  };

  const onSubmit: SubmitHandler<TournamentRankingFormData> = async ({ rankingEntries }) => {
    await createTournamentRanking(rankingEntries);
    await queryClient.invalidateQueries({ queryKey: ['ranking'] });

    handleCloseSidebar();
  }

  if (view === PLAYER)
    return <PlayerForm onSubmit={handleCreatePlayer} onCancel={() => setView(TOURNAMENT_RANKING)} />;

  return (
    <FormProvider {...form}>
      <TournamentRankingForm
        onSubmit={onSubmit}
        onCancel={handleCloseSidebar}
        onAddPlayer={() => setView(PLAYER)}
        availablePlayers={playersData}
      />
    </FormProvider>
  );
};
