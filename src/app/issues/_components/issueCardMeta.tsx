import type { IssueViewModel } from "../_types/issueViewModel";
import { priorityStyles } from "./issueStyles";

type IssueCardMetaProps = {
  issue: IssueViewModel;
};

export function IssueCardMeta({ issue }: IssueCardMetaProps) {
  const priorityStyle = priorityStyles[issue.priority];

  return (
    <div className="flex flex-wrap gap-2 text-sm text-slate-600">
      <span>Ass. {issue.assignee}</span>
      <span>•</span>
      <span
        className="px-2 py-0.5 rounded-lg font-semibold"
        style={{
          color: priorityStyle.text,
          backgroundColor: priorityStyle.background,
        }}
      >
        {issue.priority}
      </span>
      {issue.storyPoints !== undefined ? (
        <span>• {issue.storyPoints} pts</span>
      ) : null}
    </div>
  );
}
