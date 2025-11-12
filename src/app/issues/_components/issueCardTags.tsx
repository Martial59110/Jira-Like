type IssueCardTagsProps = {
  tags: string[];
};

export function IssueCardTags({ tags }: IssueCardTagsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full text-xs font-semibold"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
