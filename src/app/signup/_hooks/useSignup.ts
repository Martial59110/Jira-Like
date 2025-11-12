import { useState } from "react";
import { signIn } from "next-auth/react";

type SignupCredentials = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupResponse = {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  error?: string;
};

const API_ENDPOINT = "/api/auth/signup";
const ERROR_FALLBACK_MESSAGE = "Erreur inconnue";

function createErrorMessage(message?: string) {
  return message ?? ERROR_FALLBACK_MESSAGE;
}

async function signupUser(
  credentials: SignupCredentials,
  signal?: AbortSignal
): Promise<SignupResponse> {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    signal,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { error?: string };
    throw new Error(errorData.error ?? "Impossible de créer le compte");
  }

  return (await response.json()) as SignupResponse;
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (credentials: SignupCredentials) => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();

    try {
      const result = await signupUser(credentials, controller.signal);

      if (result.success && result.user) {
        const loginResult = await signIn("credentials", {
          email: credentials.email,
          password: credentials.password,
          redirect: false,
        });

        if (loginResult?.error) {
          return { ...result, error: "Compte créé mais connexion échouée" };
        }
      }

      return result;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return null;
      }

      const message = err instanceof Error ? err.message : undefined;
      const errorMessage = createErrorMessage(message);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
}
