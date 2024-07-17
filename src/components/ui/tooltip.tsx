import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  tooltip: ReactNode;
  className?: string;
};
const Tooltip = ({ children, tooltip, className }: TooltipProps) => {
  return (
    <div className="relative flex group appearance-none size-fit select-none">
      {children}
      <div
        data-is="tooltip"
        className={cn(
          "tooltip absolute -bottom-10 whitespace-nowrap hidden group-hover:block pointer-events-none px-2 py-1 font-medium text-sm rounded-sm",
          "bg-bogoss-600/60 text-white/90 dark:bg-bogoss-500/60",
          className
        )}>
        {tooltip}
      </div>
    </div>
  );
};

export default Tooltip;
