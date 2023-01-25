import MarkdownRender from "../markdown/MarkdownRender";

function Content() {
  return (
    <div className="w-full p-6 rounded  shadow-md ">
      <MarkdownRender markdownText="" />
    </div>
  );
}

export default Content;
