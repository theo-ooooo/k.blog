import MarkdownRender from "../markdown/MarkdownRender";

interface Props {
  content: string;
}

function Content({ content }: Props) {
  return (
    <div className="w-full p-6 rounded  shadow-md ">
      <MarkdownRender markdownText={content} />
    </div>
  );
}

export default Content;
