import { cn } from "@/lib/utils";
import type { ChangeEventHandler } from "react";
import type { InputProps } from "./InputField";

interface TextAreaProps extends InputProps {
  label: string;
}

const Textarea = ({ children, onChange, className, label }: TextAreaProps) => {
  return (
    <div className="input-group">
      <textarea
        name="msg"
        minLength={20}
        maxLength={500}
        className={cn("input", className)}
        id="message"
        onChange={onChange as ChangeEventHandler<HTMLTextAreaElement> | undefined}
        required
      />
      <label className="user-label font-semibold" htmlFor="message">
        {label}
      </label>
      {children}
    </div>
  );
};

export default Textarea;
