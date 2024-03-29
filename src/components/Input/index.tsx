import React, { useState, useEffect } from "react";
import { StyledInput } from "./styles";

type InputProps = {
  type: "text" | "number";
  value: string | number;
  setValue: (value: string) => void;
  min?: number;
  err?: boolean;
};

function Input(props: InputProps) {
  const [started, setSarted] = useState(false);
  const value = (props.value || "").toString();

  return (
    <StyledInput
      type={props.type}
      value={value}
      min={props.min || 0}
      err={props.err ?? (started && value.length === 0)}
      onChange={(e) => props.setValue(e.target.value)}
      onKeyDown={() => !started && setSarted(true)}
    />
  );
}

export default Input;
