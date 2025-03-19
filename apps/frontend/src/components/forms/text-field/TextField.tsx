interface TextFieldProps {
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
  type?: string;
}

export const TextField = ({ name, placeholder, label, defaultValue, error, type }: TextFieldProps) => {
  return (
    <label className="form-control w-full">
      <div className="label pt-0">
        <span className="label-text">{label}</span>
      </div>

      <input
        type={type ?? "text"}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        aria-invalid="true"
        className="input w-full input-md input-primary rounded-none border-2 focus:outline-0 invalid:border-green-500"
      />

      {error && (
        <div className="label">
          <span className="label-text text-error text-xs">{error}</span>
        </div>
      )}
    </label>
  );
};
