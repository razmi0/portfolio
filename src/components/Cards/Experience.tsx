import { cn } from "@/lib/utils";
import type { FormationType, ProType } from "@/types/types";
import type { HTMLAttributes, ReactNode } from "react";
import Dialog from "../Dialog";
// import { Button, type ButtonProps } from "../ui/button";
import CardWrapper from "./CardWrapper";

type CardXpProps = {
  className?: string;
  children: ReactNode;
  is: `pro-${number}` | `formation-${number}`;
  src: string;
} & HTMLAttributes<HTMLDivElement>;

const Show = ({ when, fallback = <></>, children }: { when: unknown; fallback?: ReactNode; children: ReactNode }) => {
  return when ? children : fallback;
};

interface ContentProps {
  content: ProType | FormationType;
}

const Content = ({ content }: ContentProps) => {
  const data = content as ProType & FormationType;

  return (
    <>
      <Show when={data.title}>
        <h4 className="text-left w-full !text-bogoss-350 dark:!text-bogoss-200">{data.title}</h4>
      </Show>

      {/* <Show when={data.subtitle}>
        <p className="text-sm font-semibold">{data.date}</p>
      </Show> */}
      <Show when={data.date && Array.isArray(data.date)}>
        <div className="inline-flex text-sm font-semibold">{data.date.join(" - ")}</div>{" "}
      </Show>
      <Dialog className="[&_p]:text-sm">
        <Show when={data.subtitle}>
          <h4 className="text-left w-full">{data.subtitle}</h4>
        </Show>
        <Show when={data.date}>
          <p>{data.date}</p>
        </Show>
        <Show when={data.duration}>
          <p>{data.duration}</p>
        </Show>
        <Show when={data.level}>
          <p>{data.level}</p>
        </Show>
        <Show when={data.company}>
          <p>{data.company}</p>
        </Show>
        <Show when={data.lieu}>
          <p>{data.lieu}</p>
        </Show>
        <Show when={data.status}>
          <p>{data.status}</p>
        </Show>
        <Show when={data.program}>
          <p>{data.program}</p>
        </Show>
        <Show when={data.description}>
          <p>{data.description}</p>
        </Show>
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

const CardXp = ({ className, children, src, is }: CardXpProps) => {
  return (
    <div className={`relative ${className}`}>
      <CardWrapper is={is} className={"aspect-square w-[175px] overflow-hidden"}>
        {children}
        {/* <Figure src={src} /> */}
      </CardWrapper>
      <Figure src={src} />
    </div>
  );
};

const CardGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn("grid gap-9 grid-cols-2 md:grid-cols-3 xl:grid-cols-4", className)}>{children}</div>;
};

const Experience = {
  Card: CardXp,
  Root: CardGrid,
  Content: Content,
};

export default Experience;
