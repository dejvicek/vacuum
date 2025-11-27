import { FC, useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./button";
import { RouteData } from "@/types";

type Props = {
  routes: RouteData[];
};

export const MobileNavigationMenu: FC<Props> = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="flex flex-col items-start sm:hidden">
      <Button variant={"ghost"} onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </Button>
      {isOpen && (
        <ul className="flex flex-col gap-6 items-start mt-5 pl-5">
          {routes.map(({ path, title }) => (
            <li>
              <Link to={path} onClick={() => setIsOpen(false)}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
