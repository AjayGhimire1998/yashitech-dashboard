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
          <a href={`showcases/${id}`}>View</a>
          <a href={`showcases/${id}/edit`}>Edit</a>
          {isDeleting ? (
            <LoadingSpinner color="red" height="3" width="3" />
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
