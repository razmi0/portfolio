import { cn } from "@/lib/utils";
import type { FormationType, ProType } from "@/types/types";
import { Check } from "lucide-react";
import { type HTMLAttributes, type ReactNode } from "react";
import Dialog from "../Dialog";
import Image from "../Image";
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
      <Dialog className="[&_p]:text-sm h-fit min-h-min [&>div]:py-5">
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
                  <Label>Durée</Label> : {data.duration}
                </div>
              }
            />

            <Show when={data.level}>
              <Text
                value={
                  <div className="inline-flex">
                    <Label>Niveau</Label> : {data.level}
                  </div>
                }
              />
            </Show>

            <Show when={data.company}>
              <Text
                value={
                  <div className="inline-flex">
                    <Label>Entreprise</Label> : {data.company}
                  </div>
                }
              />
            </Show>

            <Show when={data.lieu}>
              <Text
                value={
                  <div className="inline-flex">
                    <Label>Lieu</Label> : {data.lieu}
                  </div>
                }
              />
            </Show>

            <Show when={data.status}>
              <Text
                value={
                  <div className="inline-flex">
                    <Label>Statut</Label> : {data.status}
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

const Figure = ({ src }: { src: string }) => {
  return (
    <figure className="absolute -z-10 inset-0 rounded-[16px] size-[99%] overflow-hidden opacity-75">
      <Image src={src} className="anim-xp-img" role="presentation" alt="card background" />
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
    <div className={cn(`relative`, className)}>
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
