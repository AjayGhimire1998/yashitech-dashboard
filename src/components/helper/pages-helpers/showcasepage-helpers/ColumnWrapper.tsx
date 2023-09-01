import * as React from "react";
import { ShowcaseColumn } from "../../../pages/showcases-pages/styles";

interface IColumnWrapperProps {
  children?: React.ReactNode;
  className?: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
}

const ColumnWrapper: React.FunctionComponent<IColumnWrapperProps> = ({
  children,
  className,
  value1,
  value2,
  value3,
  value4,
}) => {
  return (
    <div className={className}>
      <ShowcaseColumn
        value1={value1}
        value2={value2}
        value3={value3}
        value4={value4}
      />
      {children}
    </div>
  );
};

export default ColumnWrapper;
