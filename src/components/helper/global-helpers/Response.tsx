import * as React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  txtColor?: string;
}

const Response: React.FC<Props> = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};

export default Response;
