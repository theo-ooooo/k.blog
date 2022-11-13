import { Form } from "@remix-run/react";
import { useSubmitLoading } from "~/hooks/useSubmitLoading";
import { AppError } from "~/lib/error";
import Button from "../system/Button";
import Logo from "../base/Logo";
import LabelInput from "../system/Labelnput";

interface Login {
  email: string;
  password: string;
}

interface Props {
  error?: AppError;
}

function LoginForm({ error }: Props) {
  const isLoading = useSubmitLoading();

  return (
    <Form
      className="flex w-[100%] h-[100vh] justify-center items-center px-3"
      method="post"
    >
      <div className="flex flex-col gap-4 w-[400px]">
        <Logo />
        <LabelInput
          label="이메일"
          placeholder="이메일을 입력해주세요."
          type="email"
          name="email"
          disabled={isLoading}
        />
        <LabelInput
          label="패스워드"
          placeholder="이메일을 입력해주세요."
          type="password"
          name="password"
          disabled={isLoading}
        />
        {error ? (
          <p className="text-red-500 text-center">로그인 실패하였습니다.</p>
        ) : null}
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-slate-400 text-white p-3 rounded-md"
        >
          로그인
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
