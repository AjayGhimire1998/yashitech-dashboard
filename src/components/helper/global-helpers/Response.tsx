import * as React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  xBgColor? :string;
  txtColor?: string;
  onClick: () => void;
}

const Response: React.FC<Props> = ({ onClick, className, children }) => {
  return (
    <span className={className}>
      {children}
      <small onClick={onClick}>X</small>
    </span>
  );
};

export default Response;
