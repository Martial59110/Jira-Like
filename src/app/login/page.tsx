"use client";

import { LoginForm } from "./_components/loginForm";
import { LoginHeader } from "./_components/loginHeader";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8">
      <div className="flex flex-col items-center gap-12 w-full max-w-md">
        <LoginHeader />
        <LoginForm />
      </div>
    </main>
  );
}
