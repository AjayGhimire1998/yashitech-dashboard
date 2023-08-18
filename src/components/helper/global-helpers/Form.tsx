import * as React from "react";
import { titleize } from "../../../services/other-services/showcases-services";
import { Button } from "../../../styles/global";

interface IFormProps {
  className?: string;
  children?: React.ReactNode;
  attributes?: string[];
  value?: string;
  btnText?:string;
}

const Form: React.FunctionComponent<IFormProps> = ({
  className,
  children,
  attributes,
  value,
  btnText
}) => {
  return (
    <div className={className}>
      {attributes?.map((attr, index) => {
        return (
          <div key={index}>
            <label>{titleize(attr)}: </label>
            <textarea rows={2} cols={60} value={value}></textarea>
          </div>
        );
      })}
      {children}
      <div>
        <Button onClick={() => console.log("Clickedx!!")
        } bgColor="#440a70" txtColor="white">Create</Button>
      </div>
    </div>
  );
};

export default Form;
