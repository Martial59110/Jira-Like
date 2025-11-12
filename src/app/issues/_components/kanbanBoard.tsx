"use client";

import { useState } from "react";
import type { IssueViewModel } from "../_types/issueViewModel";
import { IssueCard } from "./issueCard";

type KanbanBoardProps = {
  issues: IssueViewModel[];
};

type IssueStatus = "Backlog" | "En cours" | "En revue" | "Terminé";

const statusConfig: Record<
  IssueStatus,
  { label: string; color: string; bgColor: string }
> = {
  Backlog: {
    label: "Backlog",
    color: "text-sky-700",
    bgColor: "bg-sky-50",
  },
  "En cours": {
    label: "En cours",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
  },
  "En revue": {
    label: "En revue",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
  },
  Terminé: {
    label: "Terminé",
    color: "text-green-700",
    bgColor: "bg-green-50",
  },
};

export function KanbanBoard({ issues: initialIssues }: KanbanBoardProps) {
  const [issues, setIssues] = useState<IssueViewModel[]>(initialIssues);
  const [draggedIssue, setDraggedIssue] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<IssueStatus | null>(
    null
  );

  const statuses: IssueStatus[] = [
    "Backlog",
    "En cours",
    "En revue",
    "Terminé",
  ];

  const getIssuesByStatus = (status: IssueStatus) => {
    return issues.filter((issue) => issue.status === status);
  };

  const handleDragStart = (issueId: string) => {
    setDraggedIssue(issueId);
  };

  const handleDragOver = (e: React.DragEvent, status: IssueStatus) => {
    e.preventDefault();
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: IssueStatus) => {
    e.preventDefault();
    setDragOverColumn(null);

    if (!draggedIssue) return;

    const issue = issues.find((i) => i.id === draggedIssue);
    if (!issue || issue.status === targetStatus) {
      setDraggedIssue(null);
      return;
    }

    const updatedIssues = issues.map((i) =>
      i.id === draggedIssue
        ? {
            ...i,
            status: targetStatus,
            updatedAt: new Date().toISOString(),
            formattedUpdatedAt: new Date().toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          }
        : i
    );
    setIssues(updatedIssues);

    try {
      const response = await fetch(`/api/issues/${draggedIssue}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: targetStatus }),
        credentials: "include",
      });

      if (!response.ok) {
        setIssues(issues);
        throw new Error("Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);

      setIssues(issues);
    }

    setDraggedIssue(null);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
      {statuses.map((status) => {
        const statusIssues = getIssuesByStatus(status);
        const config = statusConfig[status];
        const isDragOver = dragOverColumn === status;

        return (
          <div
            key={status}
            className="shrink-0 w-80 flex flex-col bg-slate-50 rounded-lg"
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div
              className={`${config.bgColor} px-4 py-3 rounded-t-lg border-b-2 border-slate-200`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-semibold ${config.color} m-0`}>
                  {config.label}
                </h3>
                <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-full">
                  {statusIssues.length}
                </span>
              </div>
            </div>
            <div
              className={`flex-1 p-3 space-y-3 overflow-y-auto min-h-[400px] max-h-[calc(100vh-200px)] transition-colors ${
                isDragOver ? "bg-blue-50" : ""
              }`}
            >
              {statusIssues.length === 0 ? (
                <div
                  className={`text-center py-8 text-slate-400 text-sm border-2 border-dashed rounded-lg ${
                    isDragOver
                      ? "border-blue-400 bg-blue-50"
                      : "border-transparent"
                  }`}
                >
                  {isDragOver ? "Déposer ici" : "Aucun ticket"}
                </div>
              ) : (
                statusIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onDragStart={() => handleDragStart(issue.id)}
                    isDragging={draggedIssue === issue.id}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
