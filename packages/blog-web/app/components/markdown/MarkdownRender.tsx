import ReactMarkdown from "react-markdown";
import MarkdwonRenderer from "./MarkdownRenderer";

interface MarkdownRenderProps {
  markdownText: string;
}

function MarkdownRender({ markdownText }: MarkdownRenderProps) {
  const { imageRender, CodeBlock } = MarkdwonRenderer();
  return (
    <div>
      <div className="markdown-body">
        <ReactMarkdown
          renderers={{
            image: imageRender,
            code: CodeBlock,
          }}
        >
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
}
export default MarkdownRender;
