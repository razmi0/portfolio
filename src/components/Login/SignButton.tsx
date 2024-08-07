import { withViewTransition } from "@/lib/utils";
import { LogIn, LogOut } from "lucide-react";
import { useMemo } from "react";
import Tooltip from "../ui/tooltip";

const SignButton = ({ onClick, login }: { onClick: () => void; login: boolean }) => {
  const [handleWithTransition] = useMemo(() => withViewTransition(onClick), [onClick]);
  return (
    <Tooltip tooltip={login ? <>sign out</> : <>sign in</>} className="-translate-x-[20%]">
      <button type="button" onClick={handleWithTransition}>
        {login ? <LogOut className="size-7" /> : <LogIn className="size-7" />}
        <svg className="absolute -right-2 -translate-y-3 size-[20px]">
          <circle cx="12" cy="12" r="5" fill={!login ? "red" : "green"} />
        </svg>
      </button>
    </Tooltip>
  );
};

export default SignButton;
