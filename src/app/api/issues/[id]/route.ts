import { fakeIssues } from "../../db/data";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = (await request.json()) as { status?: string };
    const { id: issueId } = await params;

    const issueIndex = fakeIssues.findIndex((issue) => issue.id === issueId);

    if (issueIndex === -1) {
      return Response.json({ error: "Issue non trouvée" }, { status: 404 });
    }

    if (body.status) {
      fakeIssues[issueIndex].status =
        body.status as (typeof fakeIssues)[number]["status"];
      fakeIssues[issueIndex].updatedAt = new Date().toISOString();
    }

    return Response.json(fakeIssues[issueIndex]);
  } catch {
    return Response.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
