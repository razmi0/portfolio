import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/provider/routes-provider";
import type { ReactNode } from "react";
import DashbordButton from "../Admin/DashbordButton";
import SignButton from "../Login/SignButton";
import { ModeToggle } from "./ModeToggle";
import PreviousButton from "./PreviousButton";

const Nav = () => {
  const { isAuth, signOut } = useAuth();
  const { changeRoute, previous } = useRouter();

  const handleSign = () => {
    if (isAuth) {
      signOut();
      changeRoute("index");
      return;
    }
    changeRoute("login");
  };

  return (
    <Header>
      <SignButton onClick={handleSign} login={isAuth} />
      <ModeToggle />
      <DashbordButton isAuth={isAuth} onClick={() => changeRoute("dashboard")} />
      <Spacer />
      <PreviousButton
        previous={previous[previous.length - 1]}
        //
        onClick={() => changeRoute(previous[previous.length - 1])}
      />
    </Header>
  );
};

const Spacer = () => <div className="grow" />;

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="flex items-center justify-start flex-row-reverse absolute top-0 left-0 w-full mt-5 gap-3">
      {children}
    </header>
  );
};

export default Nav;
