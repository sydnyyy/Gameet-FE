import { Meta, StoryObj } from "@storybook/react";
import Inputs from "@/components/common/input/Inputs";
import { useForm, FormProvider } from "react-hook-form";
import React from "react";

const meta = {
  title: "common/Inputs",
  component: Inputs,
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "입력 필드 이름 (react-hook-form 필드 key)",
      control: "text",
    },
    label: {
      description: "입력 필드의 라벨 텍스트",
      control: "text",
    },
    placeholder: {
      description: "입력 필드의 플레이스홀더",
      control: "text",
    },
    type: {
      description: "입력 타입 (예: 'text', 'numeric')",
      control: "text",
    },
    isDisabled: {
      description: "입력 비활성화 여부",
      control: "boolean",
    },
  },
  decorators: [
    (Story, context) => {
      const methods = useForm({
        defaultValues: {
          [context.args.name]: "",
        },
      });

      return (
        <div className="w-full max-w-md p-5">
          <FormProvider {...methods}>
            <Story />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={methods.handleSubmit(data => {
                console.log(data);
              })}
            >
              제출
            </button>
          </FormProvider>
        </div>
      );
    },
  ],
} satisfies Meta<typeof Inputs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryInputs: Story = {
  render: args => <Inputs {...args} />,
  args: {
    name: "email",
    label: "이메일",
    placeholder: "이메일을 입력하세요",
    type: "text",
    isDisabled: false,
  },
};
