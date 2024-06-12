import { cn } from "@/lib/utils";
import type { ProjectType } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import CardWrapper from "./CardWrapper";

const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <>
      <div className={cn("relative flex flex-wrap gap-5", className)}>{children}</div>
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

const CardCarousel = ({ selected, content }: { selected: boolean; content: ProjectType }) => {
  const [activeImage, setActiveImage] = useState<number>(0);

  const imgSize = content.src?.length || 0;

  const handleNextImage = () => {
    const newActiveImage = (activeImage + 1) % imgSize;
    setActiveImage(newActiveImage);
  };

  const handlePrevImage = () => {
    const newActiveImage = (activeImage - 1) % imgSize;
    setActiveImage(newActiveImage);
  };
  return (
    <div
      className={cn("flex items-center justify-center", selected ? "animation-start-skill-card size-full" : "hidden")}
      key={content.id}>
      <button onClick={handlePrevImage}>
        <ChevronLeft className="hover:text-belgoss-500" />
      </button>
      <section className="size-full">
        <figure className="relative size-full z-0">
          <h3 className="text-center text-2xl">{content.title}</h3>
          {"src" in content &&
            (content.src as string[]).map((path, i) => {
              const hidden = i === activeImage ? "" : "hidden";
              return (
                <div className={`absolute inset-0 grid place-content-center -z-10 ${hidden}`} key={path}>
                  <img src={path} alt={content.title} key={path} className="object-cover place-self-center" />
                  <p className="mt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint molestiae aliquam quod, cum beatae
                    hic. Earum placeat ab et quaerat culpa! Pariatur laudantium et quod maxime labore fugiat corrupti
                    suscipit!
                  </p>
                </div>
              );
            })}
        </figure>
      </section>
      <button onClick={handleNextImage}>
        <ChevronRight className="hover:text-belgoss-500" />
      </button>
    </div>
  );
};

const CardProject = {
  Grid: CardGrid,
  Card: Card,
  Carousel: CardCarousel,
};

export default CardProject;
