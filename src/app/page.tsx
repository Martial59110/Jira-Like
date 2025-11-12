"use client";

import { useState } from "react";
import { Loader } from "./_components/loader";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { useDashboardData } from "./_hooks/useDashboardData";
import { KanbanBoard } from "./issues/_components/kanbanBoard";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, isLoading, error, refetch } = useDashboardData();

  const handleIssueCreated = () => {
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => {
      if (refetch) {
        refetch();
      } else {
        window.location.reload();
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 font-medium">{error}</div>
        </div>
      ) : data ? (
        <>
          <Navbar user={data.user} onIssueCreated={handleIssueCreated} />
          <div className="flex">
            <Sidebar user={data.user} />
            <main className="flex-1 p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 m-0 mb-1">
                  Tableau de bord
                </h1>
                <p className="text-sm text-slate-600 m-0">
                  Gérez vos issues et suivez leur progression
                </p>
              </div>
              <KanbanBoard key={refreshKey} issues={data.issues} />
            </main>
          </div>
        </>
      ) : null}
    </div>
  );
}
