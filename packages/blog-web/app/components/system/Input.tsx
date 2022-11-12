import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null;
  register?: UseFormRegisterReturn;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, register, ...rest }: Props, ref) => {
    return (
      <>
        <input
          {...rest}
          {...register}
          className="h-12 border-gray-200 rounded-md outline-0 text-base px-4 text-black transition-all ease-in-out focus:border-gray-500 border-[1px] placeholder:text-gray-200 disabled:bg-gray-500"
        />

        {errorMessage ? (
          <div className="mt-2 text-sm text-red-500">{errorMessage}</div>
        ) : null}
      </>
    );
  }
);

Input.displayName = "Input";

export default Input;
