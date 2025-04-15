"use client";

import tw from "twin.macro";

const Wrapper = tw.div`
  w-screen
  h-screen
  bg-white
  flex-center
`;

const Hello = tw.div`bg-red-50 w-[100px] h-200`;

const Write = tw.div`w-50 h-50`;

export default function Home() {
  return (
    <Wrapper>
      <Hello>
        <Write>안녕하세요!</Write>
      </Hello>
    </Wrapper>
  );
}
