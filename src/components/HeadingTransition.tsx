import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const HeadingTransition = ({
  h2,
  small,
  className,
  children,
}: {
  h2: string;
  small: string;
  className?: string;
  children?: ReactNode;
}) => {
  // dark:text-bogoss-200 text-bogoss-700
  return (
    <div className={cn("h-[10vh] w-full text-center my-0 space-y-2", className)}>
      <small className="font-bold text-[15px] text-belgoss-500">{small}</small>
      <h2 className="text-5xl uppercase">{h2}</h2>
      {children}
    </div>
  );
};

export default HeadingTransition;
