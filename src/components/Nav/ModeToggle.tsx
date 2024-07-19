import { Moon, Sun } from "lucide-react";

import { withViewTransition } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";
import { useMemo } from "react";
import Tooltip from "../ui/tooltip";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handler = () => {
    if (theme === "system") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const [handleWithTransition] = useMemo(() => withViewTransition(handler), [theme]);

  return (
    <Tooltip tooltip={"change theme"} className="">
      <button onClick={handleWithTransition} className="p-2 dark:bg-bogoss-500 bg-bogoss-200 grid place-content-center">
        <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </button>
    </Tooltip>
  );
}
