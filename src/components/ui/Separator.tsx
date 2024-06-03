import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SeparatorProps extends HTMLAttributes<"div"> {
  dir: "r" | "l" | "t" | "b";
  className?: string;
}
const Separator = (props: SeparatorProps) => {
  return (
    <>
      {props.dir === "r" && <div className={cn("border-r border-white mx-2", props.className)}></div>}
      {props.dir === "l" && <div className={cn("border-l border-white mx-2", props.className)}></div>}
      {props.dir === "t" && <div className={cn("border-t border-white mx-2", props.className)}></div>}
      {props.dir === "b" && <div className={cn("border-b border-white mx-2", props.className)}></div>}
    </>
  );
};

export default Separator;
