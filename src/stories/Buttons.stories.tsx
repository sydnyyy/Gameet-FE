import Buttons from "@/components/common/button/Buttons";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Buttons",
  component: Buttons,
} satisfies Meta<typeof Buttons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alert: Story = {
  args: {
    color: "bg-amber-500",
    width: "100px",
    height: "100px",
    content: "button",
    onClick: () => alert("버튼 클릭함"),
  },
};

export const Change: Story = {
  args: {
    color: "bg-blue-500",
    width: "100px",
    height: "100px",
    content: "button",
    changeColor: "bg-green-500",
    onClick: () => null,
  },
};
