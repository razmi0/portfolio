import type { Routes } from "@/types";
import { ArrowLeft } from "lucide-react";
import Show from "../ui/show";
import Tooltip from "../ui/tooltip";

const PreviousButton = ({ previous, onClick }: { previous: Routes | null; onClick: () => void }) => {
  const clickWithTransition = () => document.startViewTransition(onClick);

  return (
    <Show when={previous}>
      <Tooltip tooltip={<>Previous page</>} className="-translate-x-[35%]">
        <button onClick={clickWithTransition}>
          <ArrowLeft className="size-5" />
        </button>
      </Tooltip>
    </Show>
  );
};

export default PreviousButton;
