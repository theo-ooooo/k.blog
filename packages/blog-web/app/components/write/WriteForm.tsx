import React from "react";
import Button from "../system/Button";

interface Props {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  children: React.ReactNode;
}

export default function WriteForm({ onSubmit, children }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex">{children}</div>
      <Button type="submit">작성하기</Button>
    </form>
  );
}
