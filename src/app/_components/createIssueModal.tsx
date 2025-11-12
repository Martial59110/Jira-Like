"use client";

import { useState, type FormEvent } from "react";
import type { Issue } from "../api/db/data";

type CreateIssueModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function CreateIssueModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateIssueModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Issue["priority"]>("Moyenne");
  const [status, setStatus] = useState<Issue["status"]>("Backlog");
  const [assignee, setAssignee] = useState("");
  const [storyPoints, setStoryPoints] = useState<number | undefined>(undefined);
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          status,
          assignee: assignee || "À définir",
          storyPoints: storyPoints || undefined,
          tags: tagsArray,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error ?? "Erreur lors de la création");
      }

      setTitle("");
      setDescription("");
      setPriority("Moyenne");
      setStatus("Backlog");
      setAssignee("");
      setStoryPoints(undefined);
      setTags("");
      onSuccess();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 m-0">
            Créer une nouvelle issue
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Titre *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 placeholder:text-slate-400"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 min-h-[100px] placeholder:text-slate-400"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Statut
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Issue["status"])}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                disabled={isLoading}
              >
                <option value="Backlog">Backlog</option>
                <option value="En cours">En cours</option>
                <option value="En revue">En revue</option>
                <option value="Terminé">Terminé</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Priorité
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Issue["priority"])
                }
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                disabled={isLoading}
              >
                <option value="Basse">Basse</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Haute">Haute</option>
                <option value="Critique">Critique</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Assigné à
              </label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 placeholder:text-slate-400"
                placeholder="Nom de l'assigné"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Story Points
              </label>
              <input
                type="number"
                value={storyPoints || ""}
                onChange={(e) =>
                  setStoryPoints(
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 placeholder:text-slate-400"
                min="0"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 placeholder:text-slate-400"
              placeholder="tag1, tag2, tag3"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm m-0 font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Création..." : "Créer l'issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
