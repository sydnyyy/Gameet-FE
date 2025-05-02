import { Button } from "@heroui/react";
import { useState } from "react";

export interface ButtonProps {
  color: string;
  width: string;
  height: string;
  content: string;
  changeColor?: string;
  textColor?: string;
  onClick: () => void;
}

export default function Buttons({
  color,
  width,
  height,
  content,
  onClick,
  textColor,
  changeColor,
}: ButtonProps) {
  const [btnColor, setBtnColor] = useState(color);

  // 2초 뒤 실행 함수
  const handleButton = () => {
    setTimeout(() => {
      if (changeColor) {
        setBtnColor(changeColor);
      }

      onClick();
    }, 2000);
  };

  return (
    <Button
      disableRipple
      className={`${btnColor} ${textColor}`}
      style={{ width, height }}
      onPress={handleButton}
      children={<>{content}</>}
    />
  );
}
