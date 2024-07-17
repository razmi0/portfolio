import { LogIn, LogOut } from "lucide-react";
import Tooltip from "../ui/tooltip";

const SignButton = ({ onClick, login }: { onClick: () => void; login: boolean }) => (
  <Tooltip tooltip={login ? <>Sign out</> : <>Sign in</>} className="-translate-x-[20%]">
    <button type="button" onClick={onClick}>
      {login ? <LogOut className="size-7" /> : <LogIn className="size-7" />}
      <svg className="absolute -right-2 -translate-y-3 size-[20px]">
        <circle cx="12" cy="12" r="5" fill={!login ? "red" : "green"} />
      </svg>
    </button>
  </Tooltip>
);

export default SignButton;
