import type { Issue } from "../../api/db/data";

export const statusStyles: Record<
  Issue["status"],
  { text: string; background: string }
> = {
  Backlog: { text: "#0c4a6e", background: "#e0f2fe" },
  "En cours": { text: "#b45309", background: "#fef3c7" },
  "En revue": { text: "#4338ca", background: "#e0e7ff" },
  Terminé: { text: "#166534", background: "#dcfce7" },
};

export const priorityStyles: Record<
  Issue["priority"],
  { text: string; background: string }
> = {
  Basse: { text: "#1e40af", background: "#bfdbfe" },
  Moyenne: { text: "#92400e", background: "#fde68a" },
  Haute: { text: "#b91c1c", background: "#fecaca" },
  Critique: { text: "#86198f", background: "#f5d0fe" },
};
