import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { Button } from "./button";

type TabProps = {
  label: string;
  open: boolean;
  onClick: () => void;
};
const Tab = ({ label, open, onClick }: TabProps) => {
  return (
    <>
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
      </section>
    </>
  );
};

export default Tab;
