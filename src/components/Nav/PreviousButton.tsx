import { withViewTransition } from "@/lib/utils";
import type { Routes } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import Show from "../ui/show";
import Tooltip from "../ui/tooltip";

const PreviousButton = ({ previous, onClick }: { previous: Routes | null; onClick: () => void }) => {
  const [handleWithTransition] = useMemo(() => withViewTransition(onClick), [onClick]);

  return (
    <Show when={previous}>
      <Tooltip tooltip={<>Previous page</>} className="-translate-x-[35%]">
        <button onClick={handleWithTransition}>
          <ArrowLeft className="size-5" />
        </button>
      </Tooltip>
    </Show>
  );
};

export default PreviousButton;
