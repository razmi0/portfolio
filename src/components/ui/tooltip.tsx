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
  const [posX, setPosX] = useState<`translateX(-${number}px)`>();
  const [firstRender, setFirstRender] = useState(true);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tooltipRef || !tooltipRef.current) return;
    if (disabled) {
      setBtnDisabled(disabled);
      return;
    }
    const parent = tooltipRef.current.parentElement;
    const btn = parent?.firstElementChild as HTMLButtonElement;
    if (!parent) return;

    if (firstRender) {
      const translationX =
        Math.floor(tooltipRef.current.getBoundingClientRect().width / 2) -
        Math.floor(btn.getBoundingClientRect().width / 2);
      setPosX(`translateX(-${translationX}px)`);
    }

    setBtnDisabled(btn.disabled);
    setFirstRender(false);
  }, [disabled]);

  console.log(posX);

  return (
    <div className="relative flex group appearance-none size-fit select-none">
      {children}
      <Show when={!btnDisabled}>
        <div
          ref={tooltipRef}
          data-is="tooltip"
          style={{ transform: posX }}
          className={cn(
            "tooltip absolute -bottom-10 whitespace-nowrap opacity-0 sm:group-hover:opacity-100 pointer-events-none px-2 py-1 font-medium text-sm rounded-sm",
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
