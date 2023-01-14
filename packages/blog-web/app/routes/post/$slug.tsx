import BasicLayout from "~/components/layouts/BasicLayout";
import Content from "~/components/post/Content";
import Head from "~/components/post/Head";
import Tag from "~/components/post/Tag";

function Post() {
  return (
    <BasicLayout>
      <Head />
      <Content />
    </BasicLayout>
  );
}

export default Post;
