import { fakeIssues, fakeUser } from "../db/data";
import { auth } from "../auth/[...nextauth]/route";
import { getUsers } from "../auth/users";
import type { Issue } from "../db/data";

type CreateIssueRequest = {
  title: string;
  description: string;
  status: Issue["status"];
  priority: Issue["priority"];
  assignee: string;
  storyPoints?: number;
  tags: string[];
};

async function getCurrentUserName() {
  const session = await auth();

  if (session?.user?.id) {
    const userId = session.user.id;
    const users = getUsers();
    const authUser = users.find((u) => u.id === userId);
    if (authUser) {
      return authUser.name;
    }
  }

  return fakeUser.name;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateIssueRequest;

    if (!body.title) {
      return Response.json({ error: "Le titre est requis" }, { status: 400 });
    }

    const reporter = await getCurrentUserName();

    const newIssue: Issue = {
      id: `iss_${Date.now()}`,
      key: `PRST-${fakeIssues.length + 101}`,
      title: body.title,
      description: body.description || "",
      status: body.status || "Backlog",
      priority: body.priority || "Moyenne",
      assignee: body.assignee || "À définir",
      reporter,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      storyPoints: body.storyPoints,
      tags: body.tags || [],
    };

    fakeIssues.push(newIssue);

    return Response.json(newIssue, { status: 201 });
  } catch {
    return Response.json(
      { error: "Erreur lors de la création de l'issue" },
      { status: 500 }
    );
  }
}
