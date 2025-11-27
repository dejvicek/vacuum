import { t } from 'i18next';
import { useMemo } from 'react';

export type RouteData = {
  path: string;
  title: string;
};

export const useRoutes = (): RouteData[] => {
  return useMemo(() => {
    return [
      { path: '/', title: t('home.title') },
      { path: '/players', title: t('players.title') },
      { path: '/ranking', title: t('ranking.title') },
    ];
  }, [t]);
};
