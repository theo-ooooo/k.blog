import Header from "../base/Header";
import Content from "../base/Content";

interface Props {
  children: React.ReactNode;
}

function BasicLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
    </div>
  );
}

export default BasicLayout;
