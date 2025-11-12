import type { IssueViewModel } from "../_types/issueViewModel";
import { priorityStyles } from "./issueStyles";

type IssueCardProps = {
  issue: IssueViewModel;
  onDragStart?: () => void;
  isDragging?: boolean;
};

export function IssueCard({
  issue,
  onDragStart,
  isDragging = false,
}: IssueCardProps) {
  const priorityStyle = priorityStyles[issue.priority];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", issue.id);
    if (onDragStart) {
      onDragStart();
    }
  };

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      className={`bg-white rounded-lg p-3 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-move ${
        isDragging ? "opacity-50 scale-95" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-500">
              {issue.key}
            </span>
            <span
              className="text-xs font-semibold px-1.5 py-0.5 rounded"
              style={{
                color: priorityStyle.text,
                backgroundColor: priorityStyle.background,
              }}
            >
              {issue.priority}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-slate-900 m-0 line-clamp-2">
            {issue.title}
          </h4>
        </div>
      </div>

      {issue.description && (
        <p className="text-xs text-slate-600 m-0 mb-2 line-clamp-2">
          {issue.description}
        </p>
      )}

      {issue.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {issue.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded"
            >
              {tag}
            </span>
          ))}
          {issue.tags.length > 2 && (
            <span className="text-xs text-slate-500">
              +{issue.tags.length - 2}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-slate-600">
              {issue.assignee
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          {issue.storyPoints !== undefined && (
            <span className="text-xs text-slate-500 font-medium">
              {issue.storyPoints} pts
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400">
          {new Date(issue.updatedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>
    </article>
  );
}
