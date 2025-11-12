"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "../_hooks/useLogin";

type LoginFormProps = {
  onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login({ email, password });

    if (result?.success) {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 w-full flex flex-col gap-6"
    >
      <div className="flex flex-col gap-3">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-slate-700 tracking-wide"
        >
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3.5 rounded-xl border border-slate-200 text-base text-slate-900 bg-white transition-all focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          required
          disabled={isLoading}
          placeholder="votre.email@example.com"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-slate-700 tracking-wide"
          >
            Mot de passe
          </label>
          <a
            href="#"
            className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Mot de passe oublié ?
          </a>
        </div>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3.5 rounded-xl border border-slate-200 text-base text-slate-900 bg-white transition-all focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          required
          disabled={isLoading}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm m-0 font-medium">{error}</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3.5 rounded-xl border-none text-base font-semibold text-white bg-orange-500 cursor-pointer transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-[0.98]"
        disabled={isLoading}
      >
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </button>

      <div className="mt-2 text-center">
        <p className="text-sm text-slate-500 m-0">
          Pas encore de compte ?{" "}
          <a
            href="/signup"
            className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            Créer un compte
          </a>
        </p>
      </div>
    </form>
  );
}
