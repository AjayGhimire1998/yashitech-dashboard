import * as React from "react";
import { Circles } from "react-loader-spinner";

interface Props {
    color?: string;
    height?:string
    width?:string
}

const Spinner: React.FunctionComponent<Props> = ({color, width, height}) => {
  return (
    <Circles
      height={height}
      width={width}
      color={color}
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Spinner;
