import { FC } from 'react';
import { Outlet } from 'react-router';
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
    <main className="w-full h-full flex flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full bg-background z-50">
        <div className="mx-auto max-w-[1280px] px-4 flex justify-between items-center">
          <div className="hidden sm:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {routes.map(({ path, title }) => (
                  <NavigationMenuItem key={path}>
                    <NavigationMenuLink to={path} className={navigationMenuTriggerStyle()}>
                      {title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <MobileNavigationMenu routes={routes} />

          <ModeToggle />
        </div>
      </div>
      <Outlet />
    </main>
  );
};
