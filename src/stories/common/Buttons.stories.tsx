import type { Meta, StoryObj } from "@storybook/react";
import Buttons from "@/components/common/button/Buttons";

const meta = {
  title: "common/Buttons",
  component: Buttons,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "버튼 안에 표시할 텍스트 또는 요소",
      control: "text",
    },
    bgColor: {
      description: "Tailwind 배경 색상 클래스 (예: 'bg-blue-500')",
      control: "text",
    },
    textColor: {
      description: "Tailwind 텍스트 색상 클래스 (예: 'text-white')",
      control: "text",
    },
    width: {
      description: "버튼의 너비 (예: '100px', '10rem')",
      control: "text",
    },
    height: {
      description: "버튼의 높이",
      control: "text",
    },
    className: {
      description: "추가 Tailwind 클래스 (예: 'rounded-xl')",
      control: "text",
    },
    variant: {
      description: "버튼 스타일 변형",
      control: { type: "select" },
      options: ["solid", "light", "flat", "ghost", "shadow", "faded", "bordered"],
    },
    size: {
      description: "버튼 크기",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    onClick: {
      description: "버튼 클릭 시 호출되는 콜백 함수",
      action: "clicked",
    },
  },
} satisfies Meta<typeof Buttons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryButtons: Story = {
  render: args => {
    const handleClick = () => {
      args.onClick?.();
      console.log("버튼 클릭됨");
    };

    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <Buttons {...args} onClick={handleClick} />
      </div>
    );
  },
  args: {
    children: "버튼",
    bgColor: "bg-blue-500",
    textColor: "text-white",
    width: "120px",
    height: "48px",
    variant: "solid",
    size: "md",
  },
};
