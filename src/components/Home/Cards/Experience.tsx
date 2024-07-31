import { cn } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";
import type { EducationType, ProType, XpFilter } from "@/types";
import { ArrowBigRight, Check } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import Image from "../../Image";
import Tag, { type ValidTags } from "../../Tag";
import Dialog from "../../ui/Dialog";
import Show from "../../ui/show";
import CardWrapper from "./CardWrapper";

export const Experience = ({
  experiences,
  filtered,
}: {
  experiences: (ProType | EducationType)[];
  filtered: XpFilter;
}) => {
  const [activeExperience, setActiveExperience] = useState<ProType | EducationType>(experiences[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { theme } = useTheme();

  const openDialog = (experience: ProType | EducationType) => {
    setDialogOpen(true);
    setActiveExperience(experience);
  };
  const closeDialog = () => setDialogOpen(false);

  const folder = theme === "dark" ? `dark/` : "";

  return (
    <ExperienceGrid>
      <ExperienceDialog experience={activeExperience} open={dialogOpen} onClose={closeDialog} />
      {experiences.map((experience, i) => {
        const is = `${experience.type === "pro" ? "pro" : "education"}-${experience.id}`;
        return (
          <div
            className={cn("relative", filtered === "all" || experience.type.includes(filtered) ? "" : "hidden")}
            key={is}>
            <CardWrapper is={is} className={"aspect-square w-[175px] overflow-hidden"}>
              <ExperienceCard experience={experience} />
              <button
                type="button"
                onClick={() => openDialog(experience)}
                className="flex items-center justify-center gap-1 text-sm group">
                <p className="text-center w-full text-[15px] font-medium">See more</p>
                <ArrowBigRight size={24} className="group-hover:translate-x-2 transition-transform translate-y-[2px]" />
              </button>
            </CardWrapper>
            <BackgroundImage src={`cards-bg/${folder}${i + 1}.webp`} />
          </div>
        );
      })}
    </ExperienceGrid>
  );
};

const Text = ({ value, className, as }: { value: unknown & ReactNode; as?: ValidTags; className?: string }) => {
  return (
    <Show when={value}>
      <Tag as={as} className={className || ""}>
        {value}
      </Tag>
    </Show>
  );
};

const ProgramItem = ({ children }: { children?: ReactNode }) => {
  return (
    <li>
      <Check className="w-5 h-5 inline-flex mr-2 text-belgoss-500" />
      {children}
    </li>
  );
};

const Label = ({ children }: { children: ReactNode }) => (
  <div className="font-semibold text-bogoss-700 dark:text-bogoss-200">{children}</div>
);

const ExperienceCard = ({ experience }: { experience: ProType | EducationType }) => {
  return (
    <>
      <h3 className="text-center w-full !text-bogoss-350 dark:!text-bogoss-200">{experience.title}</h3>
      <Show when={Array.isArray(experience.date)}>
        <Text className="text-sm text-center font-semibold w-full" value={experience.date.join(" - ")} />
      </Show>
    </>
  );
};

const ExperienceDialog = ({
  experience,
  open,
  onClose,
}: {
  experience: ProType | EducationType;
  open: boolean;
  onClose: () => void;
}) => {
  const content = experience as ProType & EducationType;

  const program = useCallback(() => {
    return (
      content.program &&
      content.program.map((item) => item && item.length > 1 && <ProgramItem key={item}>{item}</ProgramItem>)
    );
  }, [content.program]);

  return (
    <Dialog className="[&_p]:text-sm h-fit min-h-min [&>div]:py-5" externalTrigger open={open} onClose={onClose}>
      <section className="size-full px-3 flex flex-col justify-between text-left h-full">
        <div>
          <h4 className="w-full !text-bogoss-350 dark:!text-bogoss-200">{content.title} : </h4>
          <Show when={content.subtitle}>
            <h5 className="w-full text-sm">{content.subtitle}</h5>
          </Show>
          <Show when={Array.isArray(content.date)} fallback={<Text value={content.date} />}>
            <Text className="inline-flex text-sm font-semibold" value={content.date.join(" - ")} />
          </Show>
        </div>
        <div className="flex [&_*]:grow my-3 gap-3 flex-wrap">
          <Text
            value={
              <div className="inline-flex">
                <Label>Duration</Label> : {content.duration}
              </div>
            }
          />

          <Show when={content.level}>
            <Text
              value={
                <div className="inline-flex">
                  <Label>Level</Label> : {content.level}
                </div>
              }
            />
          </Show>

          <Show when={content.company}>
            <Text
              value={
                <div className="inline-flex">
                  <Label>Company</Label> : {content.company}
                </div>
              }
            />
          </Show>

          <Show when={content.lieu}>
            <Text
              value={
                <div className="inline-flex">
                  <Label>Place</Label> : {content.lieu}
                </div>
              }
            />
          </Show>

          <Show when={content.status}>
            <Text
              value={
                <div className="inline-flex">
                  <Label>Status</Label> : {content.status}
                </div>
              }
            />
          </Show>
        </div>
        <Show when={content.program}>
          <Text as={"ul"} value={program()} />
        </Show>
        <Text value={content.description} />
      </section>
    </Dialog>
  );
};

const BackgroundImage = ({ src }: { src: string }) => {
  return (
    <figure className="absolute -z-10 inset-0 rounded-[16px] size-[99%] overflow-hidden opacity-75">
      <Image src={src} className="anim-xp-img" role="presentation" alt="card background" />
    </figure>
  );
};

const ExperienceGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("grid gap-9 grid-cols-1  2xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4", className)}>
      {children}
    </div>
  );
};

export default Experience;
