import type { Issue } from "../../api/db/data";
import { statusStyles } from "./issueStyles";

type IssueStatusBadgeProps = {
  status: Issue["status"];
};

export function IssueStatusBadge({ status }: IssueStatusBadgeProps) {
  const style = statusStyles[status];

  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full self-start"
      style={{
        color: style.text,
        backgroundColor: style.background,
      }}
    >
      {status}
    </span>
  );
}
