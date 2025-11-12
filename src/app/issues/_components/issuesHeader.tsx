type IssuesHeaderProps = {
  count: number;
};

export function IssuesHeader({ count }: IssuesHeaderProps) {
  return (
    <header className="flex justify-between items-center mb-5">
      <div>
        <h2 className="m-0 text-2xl text-slate-900 font-semibold">Issues</h2>
        <p className="m-0 text-slate-500">
          Vue d'ensemble des tickets Jira-like
        </p>
      </div>
      <span className="bg-sky-200 text-sky-900 font-semibold px-3.5 py-1.5 rounded-full">
        {count} tickets
      </span>
    </header>
  );
}
