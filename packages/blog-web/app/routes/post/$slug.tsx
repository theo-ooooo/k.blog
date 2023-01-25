import BasicLayout from "~/components/layouts/BasicLayout";
import Content from "~/components/post/Content";
import Head from "~/components/post/Head";

function Post() {
  return (
    <BasicLayout>
      <Head />
      <Content />
    </BasicLayout>
  );
}

export default Post;
