import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type VariantType = "outline" | "solid";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
      type="button"
      className={cn(
        "rounded-md w-fit",
        "active:scale-95",
        "focus:outline-none",
        "transition-all",
        variants.cl(variant),
        className
      )}>
      {children}
    </button>
  );
};

interface NavButtonProps extends ButtonProps {
  match: boolean;
}

const matchingStyles =
  "text-belgoss-500 ring-belgoss-500 hover:text-belgoss-500 hover:ring-belgoss-500 dark:text-belgoss-500 dark:ring-belgoss-500 focus:ring-belgoss-500 focus:text-belgoss-500 dark:focus:ring-belgoss-500 dark:focus:text-belgoss-500";
const NavButton = ({ match, onClick, children, ...props }: NavButtonProps) => {
  return (
    <Button
      {...props}
      type="button"
      className={cn("whitespace-nowrap", match ? matchingStyles : "")}
      variant={"outline"}
      onClick={onClick}>
      <span className="text-xl">{children}</span>
    </Button>
  );
};

export { Button, NavButton, type NavButtonProps };


