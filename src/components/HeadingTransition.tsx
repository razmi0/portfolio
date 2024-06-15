import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type HeadingTransitionProps = {
  h2: string;
  small: string;
  children?: ReactNode;
  h2Class?: string;
} & HTMLAttributes<HTMLDivElement>;

const HeadingTransition = ({ h2, small, className, h2Class, children, ...rest }: HeadingTransitionProps) => {
  return (
    <div {...rest} className={cn("h-[10vh] w-full text-center my-0 space-y-2", className)}>
      <small className="font-bold text-[15px] text-belgoss-500">{small}</small>
      <h2 className={cn("text-5xl uppercase", h2Class)}>{h2}</h2>
      {children}
    </div>
  );
};

export default HeadingTransition;
