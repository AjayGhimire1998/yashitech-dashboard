
import * as React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  txtColor?: string;
  hoverBg?:string;
  hoverColor?:string;
  radius?: string;
  border?: string;
  onClick: () => void;
}

const SubmitButton: React.FC<Props> = ({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick} >
      {children}
    </button>
  );
};

export default SubmitButton;
