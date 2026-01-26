import { FC } from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu';
import { RouteData } from '@/hooks/useRoutes';

type Props = {
  readonly routes: readonly RouteData[];
};

export const MobileNavigationMenu: FC<Props> = ({ routes }) => {
  return (
    <div className="flex sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="bottom">
          {routes.map(({ path, title }) => (
            <DropdownMenuItem key={path} asChild>
              <Link to={path} className="cursor-pointer">
                {title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
