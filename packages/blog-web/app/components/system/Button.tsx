interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

function Button({ disabled, ...rest }: ButtonProps) {
  return (
    <button {...rest} disabled={disabled}>
      {rest.children}
    </button>
  );
}

export default Button;
