import ReactMde from "react-mde";

interface MarkdownEditorProps {
  onChange: (text: string) => void;
  value: string;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { onChange, value } = props;
  return <ReactMde onChange={onChange} value={value} />;
}
