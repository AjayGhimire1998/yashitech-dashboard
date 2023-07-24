import * as React from 'react';

interface Props {
    children?: React.ReactNode;
    className?:string
}

const Data: React.FunctionComponent<Props> = ({className, children}) => {
  return <p className={className}>{children}</p>
};

export default Data;
