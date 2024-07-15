import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

export const TextError = ({ children }: { children: ReactNode }) => {
  return (
    <p
      className="text-red-500 text-sm font-semibold flex items-center gap-3 slide-from-bottom slide-from-active"
      role="alert"
      aria-live="assertive">
      <TriangleAlert />
      {children}
    </p>
  );
};

export default TextError;
