import { cn } from "@/lib/utils";
import type { SkillType } from "@/types";
import Icon from "../ui/icons/Icon";

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

export default CardSkill;
