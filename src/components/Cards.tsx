import { cn } from "@/lib/utils";
import { ExperienceType, FormationType, ProjectType, SkillType } from "@/types/types";
import Icon from "./ui/icons/Icon";

const CardSkill = ({ content, className }: { content: SkillType; className?: string }) => {
  const { title, level } = content;
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center rounded-lg bg-bogoss-300/80 py-3 px-3 mx-1 [&>h4]:text-bogoss-200 gap-2 grow transition-all w-32 max-w-32 aspect-square",
        className
      )}>
      <Icon name={title.toLowerCase()} size={25} />
      <h4 className="text-left w-full">{title}</h4>
      <p className="text-sm">{level}</p>
    </div>
  );
};

const CardXp = ({ content, className }: { content: ExperienceType | FormationType; className?: string }) => {
  const { title, date } = content;
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center rounded-lg bg-bogoss-300/80 py-3 px-3 mx-1 [&>h4]:text-bogoss-200 gap-2 grow transition-all w-52 max-w-52 aspect-square",
        className
      )}>
      <h4 className="text-left w-full">{title}</h4>
      <p className="text-sm">{date}</p>
    </div>
  );
};

const CardProject = ({ content, className }: { content: ProjectType; className?: string }) => {
  const { title, type, href } = content;
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center rounded-lg bg-bogoss-300/80 py-3 px-3 mx-1 [&>h4]:text-bogoss-200 gap-2 grow transition-all w-52 max-w-52 aspect-square",
        className
      )}>
      <h4 className="text-left w-full">{title}</h4>
      <p className="text-sm">{type}</p>
      <a href={href} className="text-sm underline">
        Voir le projet
      </a>
    </div>
  );
};

const CardGrid = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("grid gap-9 grid-cols-3", className)}>{children}</div>;
};

const Cards = {
  Skill: CardSkill,
  Xp: CardXp,
  Project: CardProject,
  Grid: CardGrid,
};

export default Cards;
