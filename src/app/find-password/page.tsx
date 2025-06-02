import FindPasswordForm from "@/components/pages/findPassword/findPasswordForm";

export default function FindPassword() {
  return (
    <div className="flex flex-col flex-1 justify-center">
      <h1>비밀번호 찾기</h1>
      <div className="form-wrap">
        <FindPasswordForm />
      </div>
    </div>
  );
}