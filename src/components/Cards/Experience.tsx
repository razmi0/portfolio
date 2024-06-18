import { cn } from "@/lib/utils";
import type { FormationType, ProType } from "@/types/types";
import { type HTMLAttributes, type ReactNode } from "react";
import Dialog from "../Dialog";
import Tag, { type ValidTags } from "../Tag";
import Show from "../ui/show";
import CardWrapper from "./CardWrapper";

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
  return <li className="">{children}</li>;
};

interface ContentProps {
  content: ProType | FormationType;
}

const Content = ({ content }: ContentProps) => {
  const data = content as ProType & FormationType;

  const program =
    data.program && data.program.map((item) => item && item.length > 1 && <ProgramItem key={item}>{item}</ProgramItem>);

  return (
    <>
      <h3 className="text-center w-full !text-bogoss-350 dark:!text-bogoss-200">{data.title}</h3>
      <Show when={Array.isArray(data.date)}>
        <Text className="text-sm text-center font-semibold w-full" value={data.date.join(" - ")} />
      </Show>
      <Dialog className="[&_p]:text-sm h-fit min-h-min">
        <section className="size-full px-3 flex flex-col justify-between text-left h-full">
          <div>
            <h4 className="w-full !text-bogoss-350 dark:!text-bogoss-200">{data.title} : </h4>
            <Show when={data.subtitle}>
              <h5 className="w-full text-sm">{data.subtitle}</h5>
            </Show>
            <Show when={Array.isArray(data.date)} fallback={<Text value={data.date} />}>
              <Text className="inline-flex text-sm font-semibold" value={data.date.join(" - ")} />
            </Show>
          </div>
          <div className="flex [&_*]:grow my-3 gap-3 flex-wrap">
            <Text
              value={
                <div className="inline-flex">
                  <div className="font-semibold text-belgoss-500">Durée</div> : {data.duration}
                </div>
              }
            />

            <Show when={data.level}>
              <Text
                value={
                  <div className="inline-flex">
                    <div className="font-semibold text-belgoss-500">Niveau</div> : {data.level}
                  </div>
                }
              />
            </Show>

            <Show when={data.company}>
              <Text
                value={
                  <div className="inline-flex">
                    <div className="font-semibold text-belgoss-500">Entreprise</div> : {data.company}
                  </div>
                }
              />
            </Show>

            <Show when={data.lieu}>
              <Text
                value={
                  <div className="inline-flex">
                    <div className="font-semibold text-belgoss-500">Lieu</div> : {data.lieu}
                  </div>
                }
              />
            </Show>

            <Show when={data.status}>
              <Text
                value={
                  <div className="inline-flex">
                    <div className="font-semibold text-belgoss-500">Statut</div> : {data.status}
                  </div>
                }
              />
            </Show>
          </div>
          <Show when={data.program}>
            <Text as={"ul"} value={program} />
          </Show>
          <Text value={data.description} />
        </section>
      </Dialog>
    </>
  );
};

const Figure = ({ src, ...props }: { src: string } & HTMLAttributes<HTMLImageElement>) => {
  return (
    <figure className="absolute -z-10 inset-0 rounded-[16px] size-[99%] overflow-hidden opacity-75">
      <img {...props} src={src} className="anim-xp-img" />
    </figure>
  );
};

type CardXpProps = {
  className?: string;
  children: ReactNode;
  is: `pro-${number}` | `formation-${number}`;
  src: string;
} & HTMLAttributes<HTMLDivElement>;

const CardXp = ({ className, children, src, is }: CardXpProps) => {
  return (
    <div className={`relative ${className}`}>
      <CardWrapper is={is} className={"aspect-square w-[175px] overflow-hidden"}>
        {children}
      </CardWrapper>
      <Figure src={src} />
    </div>
  );
};

const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("grid gap-9 grid-cols-1  2xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4", className)}>
      {children}
    </div>
  );
};

const Experience = {
  Card: CardXp,
  Root: CardGrid,
  Content: Content,
};

export default Experience;
