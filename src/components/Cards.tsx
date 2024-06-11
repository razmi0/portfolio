import { cn } from "@/lib/utils";
import type { FormationType, ProType, ProjectType, SkillType } from "@/types/types";
import type { HTMLAttributes } from "react";
import Dialog from "./Dialog";
import Icon from "./ui/icons/Icon";

const CardSkill = ({
  content,
  cols = 2,
  className,
}: {
  cols?: number;
  content: { label: string; data: SkillType[] }[];
  className?: string;
}) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-col justify-between dark:bg-bogoss-500 rounded-md p-10 py-8 w-[350px] h-fit",
          className
        )}
        key={content[0].label}
        id="WRAPPER-CONTENT">
        {content.map(({ label, data }) => (
          <>
            <h3 className={cn("uppercase text-center mb-10 !text-bogoss-300")}>{label}</h3>
            <div
              className="grid gap-7 justify-items-center"
              id="CARD"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {data.map((skill) => (
                <div key={skill.id} className="w-fit min-w-24 [&>h4]:text-bogoss-200" id="CARD-ELEMENT">
                  <Icon name={skill.title.toLowerCase()} />
                  <h4>{skill.title}</h4>
                  <p className="text-sm text-bogoss-200">{skill.level}</p>
                </div>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

const CardXp = ({ content, className }: { content: ProType | FormationType; className?: string }) => {
  const isExperience = "company" in content;

  const Pro = () => {
    const { company, date, description, duration, program, subtitle, title, lieu } = content as ProType;
    return (
      <>
        <h4 className="text-left w-full">{title}</h4>
        <p className="text-sm">{date}</p>
        <Dialog>
          <h4 className="text-left w-full">{subtitle}</h4>
          <p className="text-sm">{date}</p>
          <p className="text-sm">{duration}</p>
          <p className="text-sm">{company}</p>
          <p className="text-sm">{lieu}</p>
          <p className="text-sm">{program}</p>
          <p className="text-sm">{description}</p>
        </Dialog>
      </>
    );
  };

  const Formation = () => {
    const { date, description, duration, level, lieu, status, title } = content as FormationType;
    return (
      <>
        <h4 className="text-left w-full">{title}</h4>
        <div className="inline-flex">{date.join(" - ")}</div>
        <Dialog>
          <h4 className="text-left w-full">{title}</h4>
          <p className="text-sm">{date}</p>
          <p className="text-sm">{duration}</p>
          <p className="text-sm">{level}</p>
          <p className="text-sm">{lieu}</p>
          <p className="text-sm">{status}</p>
          <p className="text-sm">{description}</p>
        </Dialog>
      </>
    );
  };

  const is = `${isExperience ? "pro" : "formation"}-${content.id}`;

  return (
    <CardWrapper is={is} className={className} addDEUGPx={content.title.includes("DEUG")}>
      {isExperience ? <Pro /> : <Formation />}
    </CardWrapper>
  );
};

const CardProject = ({ content, className }: { content: ProjectType; className?: string }) => {
  const { title, type, href, id /*src*/ } = content;

  const handle = () => {
    console.log("HI", id);
  };

  return (
    <CardWrapper className={className} is={`project-${id}`} onClick={handle}>
      {/* <figure>
        <img src={src[3]} alt={title} className="w-full h-40 object-contain rounded-xl" />
      </figure> */}
      <h4 className="text-center w-full">{title}</h4>
      <p className="text-sm">{type}</p>
      <a href={href} className="text-sm hover:underline hover:text-bogoss-200 text-bogoss-200">
        Voir le projet
      </a>
    </CardWrapper>
  );
};

const CardGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("grid gap-9 grid-cols-2 md:grid-cols-3 xl:grid-cols-4", className)}>{children}</div>;
};

interface CardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  is: string;
  addDEUGPx?: boolean;
}

const CardWrapper = ({ children, className, is, addDEUGPx, ...props }: CardWrapperProps) => {
  /**
   * @description If the title of the content includes "DEUG", add a padding of 10px to the card (formation cards only)
   */
  const cl = addDEUGPx ? "[&>h4]:!px-10 px-5" : "px-5";
  return (
    <div
      {...props}
      data-is={is}
      className={cn(
        `z-10 flex flex-col items-center justify-center rounded-lg bg-bogoss-300/70 py-3 mx-1 [&>h4]:text-bogoss-200 [&>h4]:text-center text-balance gap-2 grow transition-all aspect-square glassy-lise`,
        cl,
        className
      )}>
      {children}
    </div>
  );
};

const Cards = {
  Skill: CardSkill,
  Xp: CardXp,
  Project: CardProject,
  Grid: CardGrid,
};

export default Cards;
