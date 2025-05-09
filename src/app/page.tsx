"use client";
import Buttons from "@/components/common/button/Buttons";
import Inputs from "@/components/common/input/Inputs";
import { Button } from "@heroui/react";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      {/* Button을 클릭하면 2초 뒤 alert가 뜬다 */}
      <Buttons
        color="red"
        width="100px"
        height="100px"
        children="버튼"
        type="button"
        textColor="text-white"
        onClick={() => alert("안녕하세요")}
      />
      <Button color="primary">Button</Button>
      {/* 2. Button을 클릭하면 2초 뒤 버튼 색상 변경 */}
      <Buttons
        color="yellow"
        width="100px"
        height="100px"
        type="button"
        children="버튼"
        changeColor="bg-purple-500"
        onClick={() => null}
      />
      {/* 3. Button을 클릭하면 2초 뒤 텍스트 표시 */}
      <Buttons
        color="blue"
        width="100px"
        height="100px"
        type="button"
        children="버튼"
        onClick={() => setText("버튼 누름")}
      />
      {text && <p>{text}</p>}
      <Inputs
        children="이메일"
        width="w-[500px]"
        height="h-[50px]"
        label="이메일을 입력하세요."
        type="email"
      ></Inputs>
    </div>
  );
}
