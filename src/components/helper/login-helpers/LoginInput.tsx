import * as React from "react";

interface Props {
  className?: string;
  inputType?: string;
  placeholder?: string;
}

const LoginInput: React.FC<Props> = ({ className, inputType, placeholder }) => {
  return (
    <input type={inputType} placeholder={placeholder} className={className} />
  );
};

export default LoginInput;
