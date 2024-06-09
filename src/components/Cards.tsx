import { cn } from "@/lib/utils";
import { FormationType, ProType, ProjectType, SkillType } from "@/types/types";
import { ArrowBigRight, SquareX } from "lucide-react";
import { useRef } from "react";
import Icon from "./ui/icons/Icon";

const CardSkill = ({ content, className }: { content: SkillType; className?: string }) => {
  const { title, level } = content;
  return (
    <Ctn className={className} is={`skill-${content.id}`}>
      <Icon name={title.toLowerCase()} size={25} />
      <h4 className="text-left w-full">{title}</h4>
      <p className="text-sm">{level}</p>
    </Ctn>
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
        <p className="text-sm">{date}</p>
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

  return (
    <Ctn is={`${isExperience ? "pro" : "formation"}-${content.id}`} className={className}>
      {isExperience ? <Pro /> : <Formation />}
    </Ctn>
  );
};

const CardProject = ({ content, className }: { content: ProjectType; className?: string }) => {
  const { title, type, href, id } = content;
  return (
    <Ctn className={className} is={`project-${id}`}>
      <h4 className="text-left w-full">{title}</h4>
      <p className="text-sm">{type}</p>
      <a href={href} className="text-sm underline">
        Voir le projet
      </a>
    </Ctn>
  );
};

const CardGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("grid gap-9 grid-cols-3", className)}>{children}</div>;
};

const Ctn = ({ children, className, is }: { children: React.ReactNode; className?: string; is: string }) => {
  return (
    <div
      data-is={is}
      className={cn(
        "flex flex-col items-start justify-center rounded-lg bg-bogoss-300/80 py-3 px-3 mx-1 [&>h4]:text-bogoss-200 gap-2 grow transition-all w-52 max-w-52 aspect-square",
        className
      )}>
      {children}
    </div>
  );
};

const Dialog = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="flex items-center justify-center gap-1 text-sm group">
        <p>Voir plus</p>
        <ArrowBigRight size={18} className="group-hover:translate-x-2 transition-transform" />
      </button>
      <dialog
        ref={dialogRef}
        className={cn(
          "min-h-64 max-h-80 min-w-96 max-w-[450px] dark:backdrop:bg-bogoss-600/50 dark:bg-bogoss-700 dark:text-bogoss-200 rounded-md",
          className
        )}>
        <div className="relative size-full flex flex-col p-3">
          {children}
          <Close close={() => dialogRef.current?.close()} />
        </div>
      </dialog>
    </>
  );
};

const Close = ({ close }: { close: () => void }) => {
  return (
    <button
      className="absolute right-0 top-0 hover:text-bogoss-500 text-bogoss-300 p-2 grid place-content-center"
      autoFocus
      type="button"
      onClick={close}>
      <SquareX />
    </button>
  );
};

const Cards = {
  Skill: CardSkill,
  Xp: CardXp,
  Project: CardProject,
  Grid: CardGrid,
};

export default Cards;
