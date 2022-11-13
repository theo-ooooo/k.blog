interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset" | undefined;
}

function Button({ ...rest }: ButtonProps) {
  return <button {...rest}>{rest.children}</button>;
}

export default Button;
