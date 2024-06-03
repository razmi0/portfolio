import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type VariantType = "outline" | "solid";
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: VariantType;
}
const variants = {
  solid:
    "dark:text-bogoss-700 text-bogoss-200 bg-bogoss-400 font-bold py-[16px] px-4 hover:bg-bogoss-400/80 focus:bg-bogoss-400/80", // dark:bg-slate-600 hover:bg-bogoss-700 card
  outline:
    "ring-[3px] ring-bogoss-400 text-bogoss-400 font-bold py-[13px] px-4 hover:ring-bogoss-700 hover:text-bogoss-700 hover:dark:ring-bogoss-200 hover:dark:text-bogoss-200 ", // card border border-slate-900 hover:bg-slate-300/20 hover:text-neutral-300
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
        className,
        "rounded-md w-fit", // text-neutral-200
        "active:scale-95",
        "focus:outline-none",
        "transition-all",
        variants.cl(variant)
      )}>
      {children}
    </button>
  );
};

export { Button };
