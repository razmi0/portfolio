import useImageGrid from "@/hooks/useImageGrid";
import { cn } from "@/lib/utils";
import type { ProjectType } from "@/types";
import { ImagePlay } from "lucide-react";
import { useState, type ReactNode } from "react";
import Image from "../../Image";
import Dialog from "../../ui/Dialog";
import CardWrapper from "./CardWrapper";

const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <>
      <div className={cn("relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", className)}>{children}</div>
    </>
  );
};

type CardProjectProps = {
  content: ProjectType;
  className?: string;
  children: ReactNode;
};

const Card = ({ content, className, children }: CardProjectProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const { title, href, id } = content;
  return (
    <>
      <CardWrapper className={cn(className, "p-3 max-h-[450px] h-fit aspect-auto")} is={`project-${id}`} glassy={false}>
        {content.src && (
          <button onClick={openDialog}>
            <ImageGrid srcs={content.src} projectName={title} />
          </button>
        )}
        <section className="flex justify-between items-center size-full">
          <div className="flex flex-col items-start text-left py-2 [&>h4]:text-belgoss-500 ">
            <h4 className="w-full text-lg">{title}</h4>
            <a href={href} className="text-sm w-full hover:underline dark:text-bogoss-200 text-bogoss-700">
              Voir le projet en ligne
            </a>
            <Dialog externalTrigger open={dialogOpen} onClose={closeDialog} className="select-none">
              {children}
            </Dialog>
          </div>
          {content.src && (
            <button onClick={openDialog} className="hover:[&>*]:text-belgoss-500">
              <ImagePlay size={36} className="dark:text-bogoss-200 text-bogoss-700 transition-colors" />
            </button>
          )}
        </section>
      </CardWrapper>
    </>
  );
};

type ImageGridProps = {
  srcs: string[];
  alts?: string[];
  projectName: string;
};

const ImageGrid = ({ srcs, alts, projectName }: ImageGridProps) => {
  const { images, layout } = useImageGrid(srcs.length, srcs);
  return (
    <article className={cn("grid grid-cols-2 grid-rows-2 max-w-[300px] h-[300px] rounded-xl overflow-hidden", layout)}>
      {images.map((src, i) => {
        return (
          <figure className={"anim-project-card"} key={src}>
            <Image
              src={src}
              alt={alts?.[i] || "screenshot of an highlighted piece of this project named " + projectName.toLowerCase()}
              className={cn("object-cover size-full object-center")}
            />
          </figure>
        );
      })}
    </article>
  );
};

const Project = {
  Grid: CardGrid,
  Card: Card,
};

export default Project;
