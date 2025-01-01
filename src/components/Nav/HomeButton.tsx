import { withViewTransition } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import { useMemo } from "react";
import Tooltip from "../ui/tooltip";

const HomeButton = ({ onClick }: { onClick: () => void }) => {
    const [handleWithTransition] = useMemo(() => withViewTransition(onClick), [onClick]);

    return (
        <Tooltip tooltip={<>Home page</>} className="-translate-x-[35%]">
            <button onClick={handleWithTransition}>
                <HomeIcon className="size-5" />
            </button>
        </Tooltip>
    );
};

export default HomeButton;
