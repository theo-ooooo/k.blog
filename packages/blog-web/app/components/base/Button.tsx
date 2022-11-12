interface ButtonProps {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

function Button({ text, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-slate-400 text-white p-5 rounded-md"
      {...rest}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
