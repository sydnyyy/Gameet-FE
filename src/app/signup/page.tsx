"use client";
import SignUpForm from "@/components/pages/signup/signupForm";

export default function SignUp() {
  return (
    <div className="flex-1 h-full flex flex-col items-center py-12">
      <h2 className="text-center font-bold text-2xl">회원가입</h2>
      <SignUpForm />
    </div>
  );
}
