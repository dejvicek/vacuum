import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps } from './ui/button';

type Props = {
  handleClick?: () => void;
} & ButtonProps &
  PropsWithChildren;

export const ActionButton: FC<Props> = ({ handleClick, children, ...rest }) => (
  <Button onClick={handleClick} className="max-w-32 mb-2 bg-black dark:bg-[#95d600] cursor-pointer" {...rest}>
    {children}
  </Button>
);
