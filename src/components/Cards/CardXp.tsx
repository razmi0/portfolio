import type { FormationType, ProType } from "@/types/types";
import Dialog from "../Dialog";
import CardWrapper from "./CardWrapper";

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

export default CardXp;
