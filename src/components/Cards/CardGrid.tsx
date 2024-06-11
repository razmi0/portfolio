import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn("grid gap-9 grid-cols-2 md:grid-cols-3 xl:grid-cols-4", className)}>{children}</div>;
};

export default CardGrid;
