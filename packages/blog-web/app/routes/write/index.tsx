import React, { useCallback } from "react";
import { MarkdownEditor } from "~/components/markdown/MarkdownEditor";
import MarkdownRender from "~/components/markdown/MarkdownRender";
import LabelInput from "~/components/system/Labelnput";
import WriteForm from "~/components/write/WriteForm";
import { useWriteActions, useWriteValue } from "~/states/write";

export default function Index() {
  const { form } = useWriteValue();

  const actions = useWriteActions();
  const onChangeContent = useCallback(
    (text: string) => {
      actions.change("content", text);
    },
    [actions]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as "title";
    const { value } = e.target;
    actions.change(key, value);
  };
  return (
    <WriteForm
      onSubmit={(e) => {
        e.preventDefault();
        console.log(form);
      }}
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
        <MarkdownEditor onChange={onChangeContent} value={form.content} />
      </div>
      <div className="flex-1 p-3">
        <h2 className="text-5xl mb-5">{form.title}</h2>
        <MarkdownRender markdownText={form.content} />
      </div>
    </WriteForm>
  );
}
