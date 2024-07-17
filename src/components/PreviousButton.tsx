import type { Routes } from "@/types";
import { ArrowLeft } from "lucide-react";
import Show from "./ui/show";
import Tooltip from "./ui/tooltip";

const PreviousButton = ({ previous, onClick }: { previous: Routes | null; onClick: () => void }) => (
  <Show when={previous}>
    <Tooltip tooltip={<>Previous page</>} className="-translate-x-[37%]">
      <button onClick={onClick}>
        <ArrowLeft className="size-5" />
      </button>
    </Tooltip>
  </Show>
);

export default PreviousButton;
