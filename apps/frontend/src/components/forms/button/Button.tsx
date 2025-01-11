interface ButtonProps {
  children: string;
  type?: HTMLButtonElement["type"];
}

export const Button = ({ children, type }: ButtonProps) => (
  <button
    className="btn btn-primary rounded-none w-full"
    type={type ?? "submit"}
  >
    {children}
  </button>
);
