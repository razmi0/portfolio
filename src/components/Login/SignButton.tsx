import { LogIn, LogOut } from "lucide-react";
import Tooltip from "../ui/tooltip";

// const LogInButton = ({ onClick }: { onClick: () => void }) => (
//   <Tooltip tooltip={<>Sign in</>} className="-translate-x-[20%]">
//     <button type="button" onClick={onClick}>
//       <LogIn className={"h-7 w-7"} />
//     </button>
//   </Tooltip>
// );

// const LogOutButton = ({ onClick }: { onClick: () => void }) => (
//   <Tooltip tooltip={<>Sign out</>} className="-translate-x-[20%]">
//     <button type="button" onClick={onClick}>
//       <LogOut className={"h-7 w-7"} />
//     </button>
//   </Tooltip>
// );

const SignButton = ({ onClick, login }: { onClick: () => void; login: boolean }) => (
  <Tooltip tooltip={login ? <>Sign out</> : <>Sign in</>} className="-translate-x-[20%]">
    <button type="button" onClick={onClick} className="[&>*]:size-7">
      {login ? <LogOut /> : <LogIn />}
    </button>
  </Tooltip>
);

export default SignButton;
