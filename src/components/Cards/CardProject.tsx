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
  const { title, type, href, id /*src*/ } = content;
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
    <CardWrapper className={className} is={`project-${id}`} data-selected={selected}>
      <button ref={ref} onClick={handle} data-selected={selected}>
        {/* <figure>
              <img src={src[3]} alt={title} className="w-full h-40 object-contain rounded-xl" />
            </figure> */}
        <h4>{title}</h4>
        <p>{type}</p>
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
