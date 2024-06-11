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
    <CardWrapper className={className + " shrink w-[130px] h-[130px]"} is={`project-${id}`} data-selected={selected}>
      <button ref={ref} onClick={handle} data-selected={selected}>
        {/* <figure>
          {src &&
            src.map((srct) => {
              return <img src={srct} alt={title} className="w-full h-40 object-contain rounded-xl" />;
            })}
        </figure> */}
        <h4>{title}</h4>
        <a href={href}>Voir le projet</a>
      </button>
    </CardWrapper>
  );
};

const CardProject = {
  Grid: CardGrid,
  Card: Card,
};

export default CardProject;
