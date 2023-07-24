import * as React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  name?: string;
  value?: string;
  rols: number;
  cols: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FunctionComponent<Props> = ({
  rols,
  cols,
  name,
  value,
  onChange,
  className,
  children,
}) => {
  return (
    <textarea
      rows={rols}
      cols={cols}
      className={className}
      onChange={onChange}
      name={name}
      value={value}
    >
      {children}
    </textarea>
  );
};

export default TextArea;
