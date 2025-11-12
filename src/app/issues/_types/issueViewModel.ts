import type { Issue } from "../../api/db/data";

export type IssueViewModel = Issue & {
  formattedCreatedAt: string;
  formattedUpdatedAt: string;
};
