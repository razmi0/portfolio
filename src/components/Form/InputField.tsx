import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  //   onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  required?: boolean;
}

const InputField = ({
  children,
  onChange,
  className,
  id,
  name,
  label,
  type = "text",
  required,
}: InputProps & { id: string; name: string; label: string; type?: string }) => {
  return (
    <div className="input-group">
      <input
        id={id}
        type={type}
        name={name}
        className={cn("input", className)}
        onChange={onChange}
        required={required}
      />
      <label className="user-label font-semibold" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputField;
