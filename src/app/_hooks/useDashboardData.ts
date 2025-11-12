import { useEffect, useState } from "react";
import type { Issue, User } from "../api/db/data";
import type { IssueViewModel } from "../issues/_types/issueViewModel";
import { mapIssuesToViewModel } from "../issues/_utils/formatIssue";

export type DashboardData = {
  user: User;
  issues: IssueViewModel[];
};

type DashboardApiResponse = {
  user: User;
  issues: Issue[];
};

const API_ENDPOINT = "/api";
const ERROR_FALLBACK_MESSAGE = "Erreur inconnue";

function createErrorMessage(message?: string) {
  return message ?? ERROR_FALLBACK_MESSAGE;
}

async function fetchDashboardData(
  signal?: AbortSignal
): Promise<DashboardData> {
  const response = await fetch(API_ENDPOINT, {
    signal,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Impossible de charger les données");
  }

  const payload = (await response.json()) as DashboardApiResponse;

  return {
    user: payload.user,
    issues: mapIssuesToViewModel(payload.issues),
  };
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refetch = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchDashboardData(controller.signal)
      .then((payload) => {
        setData(payload);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        const message = err instanceof Error ? err.message : undefined;
        setError(createErrorMessage(message));
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [refreshTrigger]);

  return { data, isLoading, error, refetch };
}
