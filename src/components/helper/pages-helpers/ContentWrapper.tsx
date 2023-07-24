import * as React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const ContentWrapper: React.FunctionComponent<Props> = ({className, children}) => {
  return <div className={className}>{children}</div>;
};

export default ContentWrapper;
