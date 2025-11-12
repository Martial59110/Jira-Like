import { useState } from "react";
import { signIn } from "next-auth/react";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  error?: string;
};

const ERROR_FALLBACK_MESSAGE = "Erreur inconnue";

function createErrorMessage(message?: string) {
  return message ?? ERROR_FALLBACK_MESSAGE;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    credentials: LoginCredentials
  ): Promise<LoginResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        const errorMessage = createErrorMessage(result.error);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      if (result?.ok) {
        return { success: true };
      }

      return { success: false, error: "Erreur lors de la connexion" };
    } catch (err) {
      const message = err instanceof Error ? err.message : undefined;
      const errorMessage = createErrorMessage(message);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
