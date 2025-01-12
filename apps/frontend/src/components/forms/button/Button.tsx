interface ButtonProps {
  text: string;
  isLoading?: boolean;
  type?: HTMLButtonElement["type"];
}

export const Button = ({ text, isLoading, type }: ButtonProps) => (
  <button
    className="btn btn-primary rounded-none w-full"
    disabled={isLoading}
    type={type ?? "submit"}
  >
    {isLoading ? <span className="loading loading-spinner disabled" /> : text}
  </button>
);
