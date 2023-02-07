import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { MarkdownEditor } from "~/components/markdown/MarkdownEditor";
import MarkdownRender from "~/components/markdown/MarkdownRender";
import LabelInput from "~/components/system/Labelnput";
import WriteForm from "~/components/write/WriteForm";
import useWrite from "~/hooks/useWrite";
import type { Post } from "~/lib/api/post";
import { getPost } from "~/lib/api/post";
import { useWriteActions } from "~/states/write";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      throw json({ message: "notfound" }, { status: 404 });
    }
    const data = await getPost(slug);
    return json(data);
  } catch (e: any) {
    return redirect("/");
  }
};

function Edit() {
  const data = useLoaderData<Post>();
  const navigate = useNavigate();
  const actions = useWriteActions();

  const { form, onChange, onChangeContent } = useWrite();

  useEffect(() => {
    if (!data) return;
    actions.change("title", data.title);
    actions.change("content", data.content);
    actions.change("postId", data.id);
    if (data.thumbnailId) {
      actions.change("thumbnailId", data.thumbnailId);
    }
    if (data.postThumbnailImage.webp) {
      actions.changeThumbnail(data.postThumbnailImage.webp);
    }
  }, []);

  return (
    <WriteForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onClick={() => {
        if (!form.title || !form.content)
          return alert("제목과 내용을 입력해주세요.");
        navigate(`/write/${data.title}/edit/thumbnail`);
      }}
      buttonText={"다음"}
    >
      <div className="flex-1 h-full p-3">
        <div className="mb-5">
          <LabelInput
            label="제목"
            placeholder="제목을 입력해주세요"
            type="text"
            name="title"
            onChange={onChange}
            value={form.title}
          />
        </div>
        {/* <div className="mb-5">
        <LabelInput
          label="태그"
          placeholder="태그를 입력해주세요"
          type="text"
          name="tags"
          onChange={onChangeTag}
          value={tag}
          onKeyDown={onKeyDown}
        />
      </div> */}
        {/* <div className="mb-5 flex gap-2">
        {_.map(form.tags, (tag) => (
          <Tag key={tag} tag={tag} onClick={tagDelete} />
        ))}
      </div> */}
        <MarkdownEditor onChange={onChangeContent} value={form.content} />
      </div>
      <div className="flex-1 p-3">
        <h2 className="text-5xl mb-5">{form.title}</h2>
        <MarkdownRender markdownText={form.content} />
      </div>
      {/* <TagLayer list={data.tagList} visible={true} selectedTag={[]} /> */}
    </WriteForm>
  );
}

export default Edit;
