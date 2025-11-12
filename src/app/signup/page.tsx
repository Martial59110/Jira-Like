"use client";

import { SignupForm } from "./_components/signupForm";
import { SignupHeader } from "./_components/signupHeader";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="flex flex-col items-center gap-12 w-full max-w-md">
        <SignupHeader />
        <SignupForm />
      </div>
    </main>
  );
}
