import * as React from "react";

interface Props {
  className?: string,
  inputType?: string,
  placeholder?: string,
  value?:string,
  name?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginInput: React.FC<Props> = ({ className, inputType, placeholder, onChange, name }) => {
  return (
    <input type={inputType} placeholder={placeholder} className={className} onChange={onChange} name={name}/>
  );
};

export default LoginInput;
