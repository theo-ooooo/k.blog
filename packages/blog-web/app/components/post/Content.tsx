import MarkdownRender from "../markdown/MarkdownRender";

function Content() {
  return (
    <div className="w-full p-6 rounded  shadow-md ">
      <MarkdownRender markdownText="# 123123123" />
    </div>
  );
}

export default Content;
