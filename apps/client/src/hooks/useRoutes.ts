import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type RouteData = {
  path: string;
  title: string;
};

export const useRoutes = (): RouteData[] => {
  const { t } = useTranslation();
  return useMemo(() => {
    return [
      { path: '/', title: t('home.title') },
      { path: '/players', title: t('players.title') },
      { path: '/ranking', title: t('ranking.title') },
    ];
  }, [t]);
};
