import { cn } from "@/lib/utils";
import type { ProjectFilter, ProjectType } from "@/types";
import { ImagePlay } from "lucide-react";
import { useState } from "react";
import Image from "../../Image";
import Dialog from "../../ui/Dialog";
import Carousel from "../Carousel";
import CardWrapper from "./CardWrapper";

export const ProjectCard = ({
  className,
  projects,
  filtered,
}: {
  className?: string;
  projects: ProjectType[];
  filtered: ProjectFilter;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeContent, setActiveContent] = useState<ProjectType>(projects[0]);

  const openDialog = (content: ProjectType) => {
    setDialogOpen(true);
    setActiveContent(content);
  };
  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      <Dialog open={dialogOpen} onClose={closeDialog} className="select-none" externalTrigger>
        <Carousel content={activeContent} />
      </Dialog>
      <div className={cn("relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", className)}>
        {projects.map((content) => {
          const { title, href, id } = content;
          const hidden = filtered === "tous" || content.type.includes(filtered) ? "" : "!hidden";
          return (
            <CardWrapper className={hidden} is={`project-${id}`} key={id} glassy={false}>
              {content.src && (
                <button onClick={() => openDialog(content)}>
                  <figure className={cn("max-w-[300px] h-[300px] rounded-xl overflow-hidden")}>
                    <Image
                      src={content.src[0]}
                      alt={"screenshot of an highlighted piece of this project named " + title.toLowerCase()}
                      className={cn("object-cover size-full object-center")}
                      loading="lazy"
                    />
                  </figure>
                </button>
              )}
              <section className="flex justify-between items-center size-full">
                <div className="flex flex-col items-start text-left py-2 [&>h4]:text-belgoss-500 ">
                  <h4 className="w-full text-lg">{title}</h4>
                  <a href={href} className="text-sm w-full hover:underline dark:text-bogoss-200 text-bogoss-700">
                    Voir le projet en ligne
                  </a>
                </div>
                {content.src && (
                  <button onClick={() => openDialog(content)} className="hover:[&>*]:text-belgoss-500">
                    <ImagePlay size={36} className="dark:text-bogoss-200 text-bogoss-700 transition-colors" />
                  </button>
                )}
              </section>
            </CardWrapper>
          );
        })}
      </div>
    </>
  );
};
