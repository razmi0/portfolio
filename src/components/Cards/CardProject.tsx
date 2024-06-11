import { cn } from "@/lib/utils";
import type { ProjectType } from "@/types/types";
import type { ReactNode } from "react";
import { useRef } from "react";
import CardWrapper from "./CardWrapper";

const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <>
      <div className={cn("relative flex flex-wrap", className)}>{children}</div>
    </>
  );
};

type CardProjectProps = {
  selected: boolean;
  index: number;
  setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
  content: ProjectType;
  className?: string;
};

const Card = ({ content, className, selected, index, setSelected }: CardProjectProps) => {
  const { title, href, id } = content;
  const ref = useRef<HTMLButtonElement>(null);

  const handle = () => {
    if (!ref.current) return;
    setSelected((prev) => {
      const newSelected = new Array(prev.length).fill(false);
      newSelected[index] = !prev[index];
      return newSelected;
    });
  };

  return (
    <CardWrapper className={className + " w-[130px] h-[130px]"} is={`project-${id}`} data-selected={selected}>
      <button ref={ref} onClick={handle} data-selected={selected} className="transition-all">
        <h4 className="text-center w-full">{title}</h4>
        <a href={href} className="text-sm hover:underline hover:text-bogoss-200 text-bogoss-200">
          Voir le projet
        </a>
      </button>
    </CardWrapper>
  );
};

const CardProject = {
  Grid: CardGrid,
  Card: Card,
};

export default CardProject;
