import * as React from "react";
import { titleize } from "../../../services/other-services/showcases-services";

interface IFormProps {
  className?: string;
  children?: React.ReactNode;
  attributes?: string[];
  value?: string;
}

const Form: React.FunctionComponent<IFormProps> = ({
  className,
  children,
  attributes,
  value,
}) => {
  return (
    <div className={className}>
      {attributes?.map((attr, index) => {
        return (
          <div key={index}>
            <label>{titleize(attr)}</label>
            <textarea rows={3} cols={60} value={value}></textarea>
          </div>
        );
      })}
      {children}
    </div>
  );
};

export default Form;
