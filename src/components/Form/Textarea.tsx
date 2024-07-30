import { cn } from "@/lib/utils";
import type { ChangeEventHandler } from "react";
import type { InputProps } from "./InputField";

const Textarea = ({ children, onChange, className }: InputProps) => {
  return (
    <div className="input-group">
      <textarea
        name="msg"
        minLength={1}
        className={cn("input", className)}
        id="message"
        onChange={onChange as ChangeEventHandler<HTMLTextAreaElement> | undefined}
      />
      <label className="user-label font-semibold" htmlFor="message">
        Message
      </label>
      {children}
    </div>
  );
};

export default Textarea;
