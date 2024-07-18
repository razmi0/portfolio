import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./button";
import Show from "./show";

type TabProps = {
  label: string;
  open: boolean;
  onClick: () => void;
  children: ReactNode;
};
const Tab = ({ label, open, onClick, children }: TabProps) => {
  return (
    <section className="flex items-center justify-center gap-2" data-is="tab">
      <Button
        className={cn(
          "flex gap-2 place-items-center dark:!text-white",
          !open && "scale-90 bg-transparent dark:!text-white/50"
        )}
        onClick={onClick}>
        {label}
        <ChevronUp className={cn("size-6 transition-transform", open && "rotate-180")} />
      </Button>
      <Show when={open}>{children}</Show>
    </section>
  );
};

export default Tab;
