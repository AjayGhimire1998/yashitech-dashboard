import * as React from "react";
import { titleize } from "../../../services/other-services/showcases-services";
import { Button } from "../../../styles/global";

interface IFormProps {
  className?: string;
  children?: React.ReactNode;
  attributes?: string[];
  value?: string;
  btnText?: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Form: React.FunctionComponent<IFormProps> = ({
  className,
  children,
  attributes,
  value,
  btnText,
  onClick,
  onChange,
}) => {
  return (
    <div className={className}>
      {attributes?.map((attr, index) => {
        return (
          <div key={index}>
            <label>{titleize(attr)}: </label>
            <textarea rows={2} cols={60} value={value} name={attr} onChange={onChange}></textarea>
          </div>
        );
      })}
      {children}
      <div>
        <Button
          onClick={onClick}
          bgColor="#440a70"
          txtColor="white"
          children={btnText}
        />
      </div>
    </div>
  );
};

export default Form;
