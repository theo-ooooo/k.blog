import { useCallback } from "react";
import { useWriteActions, useWriteValue } from "~/states/write";
import { useNavigate } from "@remix-run/react";

function useWrite() {
  const { form } = useWriteValue();
  const navigate = useNavigate();

  const actions = useWriteActions();
  const onChangeContent = useCallback(
    (text: string) => {
      actions.change("content", text);
    },
    [actions]
  );
  // const validationTag = useCallback(
  //   (tag: string) => {
  //     const resultTag = _.trim(_.replace(tag, "#", ""));
  //     if (tag === "" || _.includes(form.tags, resultTag)) return;
  //     actions.change("tags", resultTag);
  //     setTag("");
  //   },
  //   [form, actions]
  // );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as "title" | "tags";
    const { value } = e.target;
    actions.change(key, value);
  };

  // const onKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       validationTag(tag);
  //     }
  //   },
  //   [validationTag, tag]
  // );

  // const tagDelete = (tag: string) => {
  //   actions.removeTag(tag);
  // };

  const closeAction = () => {
    actions.reset();
    navigate("/");
  };

  return { form, onChangeContent, onChange, closeAction };
}

export default useWrite;
