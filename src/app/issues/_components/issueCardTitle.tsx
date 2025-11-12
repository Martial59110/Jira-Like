import type { IssueViewModel } from "../_types/issueViewModel";

type IssueCardTitleProps = {
  issue: IssueViewModel;
};

export function IssueCardTitle({ issue }: IssueCardTitleProps) {
  return (
    <header>
      <span className="text-sm font-semibold text-slate-900 tracking-wide">
        {issue.key}
      </span>
      <h3 className="m-0 text-lg text-slate-900 font-semibold">
        {issue.title}
      </h3>
    </header>
  );
}
