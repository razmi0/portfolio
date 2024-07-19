import { AreaChart } from "lucide-react";
import Tooltip from "../ui/tooltip";
import Show from "../ui/show";

const DashbordButton = ({ isAuth, onClick }: { isAuth: boolean; onClick: () => void }) => {
  return (
    <Show when={isAuth}>
      <Tooltip tooltip={<>dashboard</>} className="-translate-x-[20%]">
        <button type="button" onClick={onClick}>
          <AreaChart className="size-7" />
        </button>
      </Tooltip>
    </Show>
  );
};

export default DashbordButton;
