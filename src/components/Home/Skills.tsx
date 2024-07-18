import { cn } from "@/lib/utils";
import type { SkillType } from "@/types";
import { type Dispatch, type HTMLAttributes, type ReactNode, type SetStateAction } from "react";
import Icon from "../ui/icons/Icon";

const Root = ({ children, ...rest }: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      {...rest}
      className="grid md:grid-cols-2 md:h-[50vh] justify-center items-center md:justify-normal md:items-start gap-20 mt-20">
      {children}
    </section>
  );
};

const TechArticle = ({ skills, skillHovered }: { skills: SkillType[]; skillHovered: boolean[] }) => {
  return (
    <div className="min-w-[300px] w-full self-center md:self-baseline">
      {skills.map((skill, i) => {
        return (
          <div
            key={skill.id}
            className={cn(
              "flex items-center justify-center w-full",
              skillHovered[i] ? "animation-start-skill-card" : "hidden"
            )}>
            <div
              className={cn(
                "space-y-4 [&>h3]:text-belgoss-500 text-center sm:text-left ms:items-center sm:justify-center"
              )}>
              <h3 className="text-3xl">
                {skill.title}
                <small className="ml-2 text-sm text-bogoss-700 dark:text-bogoss-200">{skill.level}</small>
              </h3>
              <p className="max-w-[50ch] w-full text-balance text-bogoss-700 dark:text-bogoss-200">
                {skill.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TechGrid = ({ setter, skills }: { setter: Dispatch<SetStateAction<boolean[]>>; skills: SkillType[] }) => {
  const handleClick = (index: number) => {
    setter((prev: boolean[]) => prev.map((_, j) => j === index));
  };

  return (
    <div className="text-2xl text-center grid grid-cols-3 xs:grid-cols-4 place-items-center gap-3 xs:gap-7">
      {skills.map((skill, i) => {
        const handler = () => handleClick(i);
        return (
          <button
            onClick={handler}
            key={skill.id}
            className={cn(`inline-flex items-center text-2xl text-center text-bogoss-400 element transition-all`)}>
            <Icon name={skill.title.toLowerCase()} className="w-12 h-12 sm:w-14 sm:h-14" />
          </button>
        );
      })}
    </div>
  );
};

const Skills = {
  Root: Root,
  Article: TechArticle,
  Grid: TechGrid,
};

export default Skills;
