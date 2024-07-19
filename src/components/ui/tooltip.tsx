import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Show from "./show";

type TooltipProps = {
  children: ReactNode;
  tooltip: ReactNode;
  disabled?: boolean;
  className?: string;
};
const Tooltip = ({ children, tooltip, className, disabled = false }: TooltipProps) => {
  const [btnDisabled, setBtnDisabled] = useState(disabled);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tooltipRef || !tooltipRef.current) return;
    if (disabled) {
      setBtnDisabled(disabled);
      return;
    }
    const parent = tooltipRef.current.parentElement;
    if (!parent) return;
    const btn = parent.firstElementChild as HTMLButtonElement;
    if (!btn) return;
    setBtnDisabled(btn.disabled);
  }, [disabled]);

  return (
    <div className="relative flex group appearance-none size-fit select-none">
      {children}
      <Show when={!btnDisabled}>
        <div
          ref={tooltipRef}
          data-is="tooltip"
          className={cn(
            "tooltip absolute -bottom-10 whitespace-nowrap hidden sm:group-hover:block pointer-events-none px-2 py-1 font-medium text-sm rounded-sm",
            "bg-bogoss-600/60 text-white/90 dark:bg-bogoss-500/60",
            className
          )}>
          {tooltip}
        </div>
      </Show>
    </div>
  );
};

export default Tooltip;
