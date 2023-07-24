import * as React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Attribute: React.FunctionComponent<Props> = ({ className, children }) => {
  return <h2 className={className}>{children}:</h2>;
};

export default Attribute;
