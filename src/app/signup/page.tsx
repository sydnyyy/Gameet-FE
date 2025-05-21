"use client";
import SignUpForm from "@/components/pages/signup/signupForm";

export default function SignUp() {
  return (
    <div className="flex flex-col">
      <h1 className="mt-14">회원가입</h1>
      <div className="form-wrap">
        <SignUpForm />
      </div>
    </div>
  );
}
