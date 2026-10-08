
import type { ReactNode } from "react";

interface FormFieldProps {
  label?: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
}: FormFieldProps) {
  const messageId = `${htmlFor}-message`;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-text-primary"
        >
          {label}

          {required && (
            <span
              className="ml-1 text-danger"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p
          id={messageId}
          role="alert"
          className="text-sm text-danger"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={messageId}
          className="text-sm text-text-secondary"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
