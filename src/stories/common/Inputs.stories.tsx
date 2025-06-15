import Inputs from "@/components/common/input/Inputs";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "common/Inputs",
  component: Inputs,
  argTypes: {
    onChange: {
      description: "입력 값 변경 시 호출되는 함수",
      action: "changed",
    },
    width: {
      description: "인풋 너비 (예: '300px', '100%', '10rem')",
      control: "text",
    },
    height: {
      description: "인풋 높이 (예: '40px', '50px')",
      control: "text",
    },
    label: {
      description: "입력 필드에 대한 라벨",
      control: "text",
    },
    type: {
      description: "입력 필드 타입 (예: 'text', 'email', 'password')",
      control: "radio",
      options: ["text", "email", "password", "url", "tel", "search", "file"],
    },
    placeholder: {
      description: "입력 필드에 대한 placeholder 텍스트",
      control: "text",
    },
    description: {
      description: "입력 필드에 대한 설명 (선택 사항)",
      control: "text",
    },
    disabled: {
      description: "인풋을 비활성화할지 여부",
      control: "boolean",
    },
    errorMessage: {
      description: "입력 필드에 대한 오류 메시지",
      control: "text",
    },
    readOnly: {
      description: "입력 필드를 읽기 전용으로 설정할지 여부",
      control: "boolean",
    },
    required: {
      description: "입력 필드가 필수인지 여부",
      control: "boolean",
    },
    value: {
      description: "입력 필드의 값",
      control: "text",
    },
    minLength: {
      description: "입력 필드에 대한 최소 길이 제한",
      control: "number",
    },
    maxLength: {
      description: "입력 필드에 대한 최대 길이 제한",
      control: "number",
    },
    validate: {
      description: "입력 값 검증 함수",
      control: "text",
    },
  },
} satisfies Meta<typeof Inputs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryInputs: Story = {
  render: args => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
    };

    return (
      <div className="w-full h-[500px] flex-center">
        <Inputs {...args} onChange={handleChange} />
      </div>
    );
  },
  args: {
    label: "이메일",
    type: "email",
    width: "300px",
    height: "40px",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  },
};
