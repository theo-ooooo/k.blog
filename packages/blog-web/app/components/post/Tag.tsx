import { Link } from "@remix-run/react";

interface Props {
  tag: string;
  onClick?(tag: string): void;
  link?: boolean;
}

function Tag(props: Props) {
  const { tag, onClick, link } = props;

  if (link) {
    return (
      <Link to={`/tag/${tag}`}>
        <div className="mb-[0.875rem] bg-gray-200 px-4 h-8 rounded-2xl inline-flex items-center text-orange-500 font-medium text-base -tracking-[1px] cursor-pointer">
          {tag}
        </div>
      </Link>
    );
  }
  return (
    <div
      className="mb-[0.875rem] bg-gray-200 px-4 h-8 rounded-2xl inline-flex items-center text-orange-500 font-medium text-base -tracking-[1px] cursor-pointer"
      onClick={onClick ? () => onClick(tag) : undefined}
    >
      {tag}
    </div>
  );
}

export default Tag;
