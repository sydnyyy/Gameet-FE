"use client";
import Buttons from "@/components/common/button/Buttons";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <div className="w-[200px] h-[200px] text-yellow-300 flex items-center justify-center bg-blue-500">
        <p className="text-lg font-bold">안녕하세요! ㅋㅋ</p>
      </div> */}

      {/* Button을 클릭하면 2초 뒤 alert가 뜬다 */}
      <Buttons
        color="bg-red-500"
        width="100px"
        height="100px"
        content="버튼"
        textColor="text-white"
        onClick={() => alert("안녕하세요")}
      />

      {/* 2. Button을 클릭하면 2초 뒤 버튼 색상 변경 */}
      <Buttons
        color="bg-yellow-500"
        width="100px"
        height="100px"
        content="버튼"
        changeColor="bg-purple-500"
        onClick={() => null}
      />

      {/* 3. Button을 클릭하면 2초 뒤 텍스트 표시 */}
      <Buttons
        color="bg-blue-500"
        width="100px"
        height="100px"
        content="버튼"
        onClick={() => setText("버튼 누름")}
      />
      {text && <p>{text}</p>}
    </div>
  );
}
