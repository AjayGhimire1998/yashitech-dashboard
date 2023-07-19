import * as React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const SubmitButton: React.FC<Props> = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};

export default SubmitButton;
