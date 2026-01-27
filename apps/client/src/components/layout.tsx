import { FC } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
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
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

export const Layout: FC = () => {
  const routes = useRoutes();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full p-4 flex justify-between z-900 bg-background">
        <div className="hidden sm:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {routes.map(({ path, title }) => (
                <NavigationMenuItem key={path}>
                  <NavLink to={path}>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{title}</NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <MobileNavigationMenu routes={routes} />
        <div className="flex items-center gap-2">
          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ModeToggle />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
