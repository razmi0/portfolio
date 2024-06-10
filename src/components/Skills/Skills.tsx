import { cn } from "@/lib/utils";
import type { SkillType } from "@/types/types";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import Icon from "../ui/icons/Icon";

const Root = ({ children }: { children: ReactNode }) => {
  return <section className="grid grid-cols-2 place-items-center min-h-[50vh]">{children}</section>;
};

const TechArticle = ({ skills, skillHovered }: { skills: SkillType[]; skillHovered: boolean[] }) => {
  return (
    <div className="min-w-[300px]">
      {skills.map((skill, i) => {
        return (
          <div
            className={cn(
              "flex items-center justify-center",
              skillHovered[i] ? "animation-start-skill-card" : "hidden"
            )}>
            <div className={cn("space-y-4")}>
              <h3 className="text-3xl">
                {skill.title}
                <small className="text-sm text-bogoss-200">{skill.level}</small>
              </h3>
              <p className="max-w-[50ch]">{skill.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TechGrid = ({ setter, skills }: { setter: Dispatch<SetStateAction<boolean[]>>; skills: SkillType[] }) => {
  return (
    <div className="w-full">
      <div className="text-2xl text-center grid grid-cols-4 place-items-center my-10 gap-4">
        {skills.map((skill, i) => {
          return (
            <button
              onMouseEnter={() => setter((prev: boolean[]) => prev.map((_, j) => j === i))}
              key={skill.id}
              className="inline-flex items-center text-2xl text-center text-bogoss-300 element transition-all">
              <Icon name={skill.title.toLowerCase()} size={52} className="mx-6" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Skills = {
  Root: Root,
  TechArticle: TechArticle,
  TechGrid: TechGrid,
};

export default Skills;
