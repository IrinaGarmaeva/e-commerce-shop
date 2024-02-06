import { ButtonProps } from "./types";

function Button({ className, type, onClick, text, children, disabled }: ButtonProps) {
  return (
    <button className={className} type={type} onClick={onClick} disabled={!disabled}>
      {children ? children : text}
    </button>
  );
}

export default Button;
