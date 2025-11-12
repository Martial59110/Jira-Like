import type { IssueViewModel } from "../_types/issueViewModel";
import { IssueCard } from "./issueCard";
import { IssuesHeader } from "./issuesHeader";

type IssuesBoardProps = {
  issues: IssueViewModel[];
};

export function IssuesBoard({ issues }: IssuesBoardProps) {
  return (
    <section className="bg-slate-100 rounded-2xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.2)]">
      <IssuesHeader count={issues.length} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
      {issues.length === 0 ? (
        <p className="text-slate-500 mt-6">
          Aucun ticket trouvé pour le moment.
        </p>
      ) : null}
    </section>
  );
}
