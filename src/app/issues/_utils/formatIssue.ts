import type { Issue } from "../../api/db/data";
import type { IssueViewModel } from "../_types/issueViewModel";

const DATE_LOCALE = "fr-FR";
const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

function formatIssueDates(issue: Issue): IssueViewModel {
  return {
    ...issue,
    formattedCreatedAt: new Date(issue.createdAt).toLocaleDateString(
      DATE_LOCALE,
      DATE_FORMAT
    ),
    formattedUpdatedAt: new Date(issue.updatedAt).toLocaleDateString(
      DATE_LOCALE,
      DATE_FORMAT
    ),
  };
}

export function mapIssuesToViewModel(issues: Issue[]): IssueViewModel[] {
  return issues.map(formatIssueDates);
}
