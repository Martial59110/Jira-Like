import { fakeIssues, fakeUser, type User } from "./db/data";
import { auth } from "./auth/[...nextauth]/route";
import { getUsers } from "./auth/users";

async function getCurrentUser(): Promise<User> {
  const session = await auth();

  if (session?.user?.id) {
    const userId = session.user.id;
    const users = getUsers();
    const authUser = users.find((u) => u.id === userId);
    if (authUser) {
      return {
        id: authUser.id,
        name: authUser.name,
        role: "Membre",
        email: authUser.email,
        team: "Équipe",
        projects: 0,
        lastLogin: new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
    }
  }

  return fakeUser;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const issues = fakeIssues.filter((issue) => {
    const matchStatus = status ? issue.status === status : true;
    const matchPriority = priority ? issue.priority === priority : true;
    return matchStatus && matchPriority;
  });

  const user = await getCurrentUser();

  return Response.json({
    user,
    issues,
  });
}
