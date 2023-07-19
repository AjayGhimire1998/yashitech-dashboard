import * as React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  display?: string;
  flexD?: string;
  justifyC?: string;
  alignI?: string;
}

const LoginInputWrapper: React.FC<Props> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default LoginInputWrapper;
