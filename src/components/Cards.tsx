import { cn } from "@/lib/utils";
import { FormationType, ProType, ProjectType, SkillType } from "@/types/types";
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

  const is = `${isExperience ? "pro" : "formation"}-${content.id}`;

  return (
    <Ctn is={is} className={className}>
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

const Cards = {
  Skill: CardSkill,
  Xp: CardXp,
  Project: CardProject,
  Grid: CardGrid,
};

export default Cards;
