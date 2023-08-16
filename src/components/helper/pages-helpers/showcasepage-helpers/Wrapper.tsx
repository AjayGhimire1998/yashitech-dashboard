import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;

}

const Wrapper: React.FunctionComponent<Props> = ({ children, className }) => {
  return <div className={className}>
    {children}
  </div>
};

export default Wrapper;
