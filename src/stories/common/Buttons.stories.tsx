import Buttons from "@/components/common/button/Buttons";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "common/Buttons",
  component: Buttons,
  argTypes: {
    color: {
      description: "버튼 배경색 (Tailwind 클래스 예: 'bg-blue-500')",
      control: "text",
    },
    width: {
      description: "버튼 너비 (예: '100px', '100%', '10rem')",
      control: "text",
    },
    height: {
      description: "버튼 높이",
      control: "text",
    },
    children: {
      description: "버튼 안에 표시할 텍스트",
      control: "text",
    },
    textColor: {
      description: "텍스트 색상 (Tailwind 클래스 예: 'text-white')",
      control: "text",
    },
    changeColor: {
      description: "2초 후 바뀔 배경색 (Tailwind 클래스)",
      control: "text",
    },
    onClick: {
      description: "버튼 클릭 시 실행되는 함수",
      action: "clicked",
    },
  },
} satisfies Meta<typeof Buttons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryButtons: Story = {
  render: args => {
    const handleButtons = () => {
      args.onClick();
      console.log("1234");
    };

    return (
      <div className="w-full h-[500px] flex-center">
        <Buttons {...args} onClick={handleButtons} />
      </div>
    );
  },
  args: {
    color: "bg-red-500",
    width: "100px",
    height: "100px",
    children: "버튼",
    textColor: "text-blue",
    changeColor: "bg-purple-500",
    type: "button",
    onClick: () => console.log("기본 클릭"),
  },
};
