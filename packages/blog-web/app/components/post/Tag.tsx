interface Props {
  tag: string;
}

function Tag(props: Props) {
  const { tag } = props;
  return (
    <div className="mb-[0.875rem] bg-gray-200 px-4 h-8 rounded-2xl inline-flex items-center text-orange-500 font-medium text-base -tracking-[1px] cursor-pointer">
      {tag}
    </div>
  );
}

export default Tag;
