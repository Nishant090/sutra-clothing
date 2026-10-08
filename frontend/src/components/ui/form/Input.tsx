
import { forwardRef, type InputHTMLAttributes } from "react";
import FormField from "./FormField";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label?: string;
  id?: string;
  name: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      id,
      name,
      required = false,
      disabled = false,
      error,
      hint,
      className = "",
      ...props
    },
    ref
  ) {
    const inputId = id ?? name;
    const messageId = `${inputId}-message`;

    return (
      <FormField
        label={label}
        htmlFor={inputId}
        required={required}
        error={error}
        hint={hint}
      >
        <input
          {...props}
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error || hint ? messageId : undefined
          }
          className={[
            "w-full rounded-lg border bg-white px-3 py-2.5",
            "text-sm text-text-primary placeholder:text-slate-400",
            "border-border transition-colors",
            "focus:border-primary focus:outline-none",
            "focus:ring-2 focus:ring-primary/20",
            "disabled:cursor-not-allowed disabled:bg-slate-100",
            error ? "border-danger focus:border-danger" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </FormField>
    );
  }
);

export default Input;
