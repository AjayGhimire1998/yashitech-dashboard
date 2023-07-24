import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  linkTo?:string;
  // onClick: () => void;
}

const NavLink: React.FunctionComponent<Props> = ({linkTo, className, children}) => {
  return <a href={linkTo} className={className}>{children}</a>
};

export default NavLink;
