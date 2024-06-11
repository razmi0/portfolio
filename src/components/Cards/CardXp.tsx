import type { FormationType, ProType } from "@/types/types";
import Dialog from "../Dialog";
import { useTheme } from "../theme-provider";
import CardWrapper from "./CardWrapper";

const CardXp = ({
  content,
  className,
  index,
}: {
  content: ProType | FormationType;
  className?: string;
  index: number;
}) => {
  const isExperience = "company" in content;

  const { theme } = useTheme();

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
  const folder = theme === "dark" ? "dark/" : "";

  return (
    <div className="relative">
      <CardWrapper is={is} className={className} addDEUGPx={content.title.includes("DEUG")}>
        {isExperience ? <Pro /> : <Formation />}
      </CardWrapper>
      <figure className="absolute -z-10 size-full inset-0 rounded-[16px] overflow-hidden">
        <img src={`cards-bg/${folder}${index + 1}.png`} />
      </figure>
    </div>
  );
};

export default CardXp;
