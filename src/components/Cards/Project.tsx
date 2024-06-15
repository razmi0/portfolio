import { cn } from "@/lib/utils";
import type { ProjectType } from "@/types/types";
import type { ReactNode } from "react";
import Dialog from "../Dialog";
import CardWrapper from "./CardWrapper";

const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <>
      <div className={cn("relative grid grid-cols-3 gap-5", className)}>{children}</div>
    </>
  );
};

type ProjectProps = {
  content: ProjectType;
  className?: string;
  children: ReactNode;
};

const Card = ({ content, className, children }: ProjectProps) => {
  const { title, href, id } = content;

  return (
    <>
      <CardWrapper className={className + " p-2 w-[160px] h-[140px] hover:scale-105"} is={`project-${id}`}>
        <div className="transition-all flex flex-col items-center justify-around h-full">
          <h4 className="text-center w-full">{title}</h4>
          <a href={href} className="text-sm w-full text-center hover:underline dark:text-bogoss-200 text-bogoss-700">
            Voir le projet en ligne
          </a>
          <Dialog className="select-none">{children}</Dialog>
        </div>
      </CardWrapper>
    </>
  );
};

const Project = {
  Grid: CardGrid,
  Card: Card,
};

export default Project;
