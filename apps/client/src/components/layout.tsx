import { FC } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useTranslation } from 'react-i18next';
import { ModeToggle } from './mode-toggle';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

type RouteData = {
  path: string;
  title: string;
};

export const Layout: FC = () => {
  const { t } = useTranslation();

  const routes: RouteData[] = [
    { path: '/', title: t('home.title') },
    { path: '/players', title: t('players.title') },
    { path: '/ranking', title: t('ranking.title') },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between">
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              {routes.map(({ path, title }) => (
                <NavigationMenuItem>
                  <NavLink to={path}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{title}</NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
