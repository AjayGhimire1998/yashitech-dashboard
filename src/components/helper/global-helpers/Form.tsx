import * as React from "react";
import { titleize } from "../../../services/other-services/showcases-services";


interface IFormProps {
  className?: string;
  // children?: React.ReactNode;
  attribute: string;
  // requiredParam: string;
  value: string | undefined;
  // btnText?: string;
  // onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Form: React.FunctionComponent<IFormProps> = ({
  className,
  attribute,
  // requiredParam,
  value,
  // btnText,
  // onClick,
  onChange,
}) => {
  return (
    <div className={className}>
      {/* {attributes?.map((attr: any, index: number) => { */}
      {/* return ( */}
      <div>
        <label>{titleize(attribute)}: </label>
        <textarea
          rows={2}
          cols={60}
          value={value}
          name={attribute}
          onChange={onChange}
        ></textarea>
      </div>
      {/* );
      })} */}
      {/* {children}
      <div>
        <Button
          onClick={onClick}
          bgColor="#440a70"
          txtColor="white"
          children={btnText}
        />
      </div> */}
    </div>
  );
};

export default Form;
