import { FC } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from './mode-toggle';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { MobileNavigationMenu } from './ui/mobile-navigation-menu';
import { useRoutes } from '@/hooks/useRoutes';

export const Layout: FC = () => {
  const routes = useRoutes();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between z-900 bg-background">
        <div className="hidden sm:flex">
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
        <MobileNavigationMenu routes={routes} />
        <div>
          <ModeToggle />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
