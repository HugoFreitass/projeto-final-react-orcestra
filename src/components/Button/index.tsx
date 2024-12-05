import React from "react";
import * as C from "./styles.js";

interface ButtonProps {
  Text: string;
  onClick?: () => void;
  Type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ Text, onClick, Type = "button" }) => {
  return (
    <C.Button type={Type} onClick={onClick}>
      {Text}
    </C.Button>
  );
};

export default Button;
