import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type VariantType = "outline" | "solid";
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: VariantType;
}
const variants = {
  solid: "bg-cyan-900 hover:bg-cyan-950 card",
  outline: "hover:bg-cyan-300/20 hover:text-neutral-300 card border border-cyan-900",
  cl: function (variant: VariantType = "solid") {
    return this[variant];
  },
};

const Button = ({ children, variant, onClick, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      data-button="button"
      className={cn(
        "px-4 py-2 text-neutral-200 rounded-md w-fit",
        "active:bg-cyan-800",
        "hover:text-neutral-300",
        "focus:bg-cyan-800 focus:outline-none",
        "transition-all",
        variants.cl(variant),
        className
      )}>
      {children}
    </button>
  );
};

export { Button };
