import classnames from "classnames";
import { forwardRef, useState } from "react";
import Input, { type Props as InputProps } from "./Input";

interface Props extends InputProps {
  label: string;
}

const LabelInput = forwardRef<HTMLInputElement, Props>(
  ({ label, onBlur, onFocus, ...rest }: Props, ref) => {
    const [focused, setFocused] = useState(false);
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      setFocused(true);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      setFocused(false);
    };
    return (
      <div className="flex flex-col">
        <label
          className={classnames(
            "text-base text-gray-800 font-semibold mb-2 transition-all ease-in-out delay-200",
            { "text-black": focused }
          )}
        >
          {label}
        </label>
        <Input onFocus={handleFocus} onBlur={handleBlur} {...rest} ref={ref} />
      </div>
    );
  }
);

LabelInput.displayName = "LabelInput";

export default LabelInput;
