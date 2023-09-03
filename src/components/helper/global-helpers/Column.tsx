import * as React from "react";
import { maxTenChars } from "../../../services/other-services/showcases-services";
import { LoadingSpinner } from "../../../styles/global";

interface IColumnsProps {
  className?: string;
  value1?: string;
  value2: string;
  value3: string;
  value4: string;
  id?: string;
  href1?: string;
  href2?: string;
  bgColor?: string;
  isDeleting?: boolean;
  onClick?: () => void;
}

const Column: React.FunctionComponent<IColumnsProps> = ({
  className,
  value1,
  value2,
  value3,
  value4,
  id,
  href1,
  href2,
  onClick,
  isDeleting,
}) => {
  return (
    <div className={className}>
      <div>{value1}</div>
      <div>{maxTenChars(value2)}</div>
      <div>{maxTenChars(value3)}</div>
      <div>{maxTenChars(value4)}</div>
      {id ? (
        <div>
          {href1 ? <a href={href1}>View</a> : null}
          <a href={href2}>Edit</a>
          {isDeleting ? (
            <LoadingSpinner color="red" height="3px" width="3px" />
          ) : (
            <button onClick={onClick}>Delete</button>
          )}
        </div>
      ) : (
        <div>
          <p></p>
          <p></p>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Column;
