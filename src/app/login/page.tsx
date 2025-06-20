import LoginForm from "@/components/pages/login/LoginForm";

export default function Login() {
  return (
    <div className="relative flex-1 flex flex-col justify-center">
      <h1 className="absolute top-48 left-1/2 -translate-x-1/2">로그인</h1>
      <div className="form-wrap">
        <LoginForm />
      </div>
    </div>
  );
}
