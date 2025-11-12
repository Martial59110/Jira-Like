export type User = {
  id: string;
  name: string;
  role: string;
  email: string;
  team: string;
  projects: number;
  lastLogin: string;
};

export type Issue = {
  id: string;
  key: string;
  title: string;
  description: string;
  status: "Backlog" | "En cours" | "En revue" | "Terminé";
  priority: "Basse" | "Moyenne" | "Haute" | "Critique";
  assignee: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  storyPoints?: number;
  tags: string[];
};

export const fakeUser: User = {
  id: "usr_001",
  name: "Martin Dumas",
  role: "Chef de produit",
  email: "martin.dumas@example.com",
  team: "Équipe Atlas",
  projects: 7,
  lastLogin: "21 octobre 2025",
};

export const fakeIssues: Issue[] = [
  {
    id: "iss_101",
    key: "PRST-101",
    title: "Configurer l'authentification SSO",
    description:
      "Permettre aux utilisateurs internes de se connecter via Azure AD afin de simplifier l'onboarding.",
    status: "En cours",
    priority: "Haute",
    assignee: "Camille Roy",
    reporter: "Martin Dumas",
    createdAt: "2025-10-12T09:24:00Z",
    updatedAt: "2025-10-20T14:35:00Z",
    storyPoints: 5,
    tags: ["auth", "prioritaire"],
  },
  {
    id: "iss_102",
    key: "PRST-102",
    title: "Refonte du tableau Kanban",
    description:
      "Moderniser le design du tableau pour introduire les vues compactes et l'édition inline.",
    status: "En revue",
    priority: "Moyenne",
    assignee: "Lucas Tremblay",
    reporter: "Martin Dumas",
    createdAt: "2025-10-02T11:03:00Z",
    updatedAt: "2025-10-19T08:10:00Z",
    storyPoints: 8,
    tags: ["UI", "kanban"],
  },
  {
    id: "iss_103",
    key: "PRST-103",
    title: "Mettre en place les SLA sur les tickets critiques",
    description:
      "Définir les règles d'escalade automatique pour les issues marquées comme critiques.",
    status: "Backlog",
    priority: "Critique",
    assignee: "À définir",
    reporter: "Sofia Martel",
    createdAt: "2025-10-18T15:15:00Z",
    updatedAt: "2025-10-21T07:42:00Z",
    storyPoints: 3,
    tags: ["SLA", "automation"],
  },
  {
    id: "iss_104",
    key: "PRST-104",
    title: "Améliorer la recherche globale",
    description:
      "Ajouter le support de la recherche par étiquette, assigné et date de mise à jour.",
    status: "Terminé",
    priority: "Basse",
    assignee: "Émilie Caron",
    reporter: "Martin Dumas",
    createdAt: "2025-09-28T10:45:00Z",
    updatedAt: "2025-10-15T17:30:00Z",
    storyPoints: 2,
    tags: ["search", "ux"],
  },
];
