import { withViewTransition } from "@/lib/utils";
import { NewspaperIcon } from "lucide-react";
import { useMemo } from "react";
import Tooltip from "../ui/tooltip";

const BlogButton = ({ onClick }: { onClick: () => void }) => {
    const [handleWithTransition] = useMemo(() => withViewTransition(onClick), [onClick]);

    return (
        <Tooltip tooltip={<>Blog</>}>
            <button onClick={handleWithTransition}>
                <NewspaperIcon className="size-5" />
            </button>
        </Tooltip>
    );
};

export default BlogButton;
