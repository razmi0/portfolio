import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, type HTMLAttributes } from "react";

type ValidTags = keyof JSX.IntrinsicElements;
type CardWrapperProps<T extends ValidTags> = {
  is: string;
  as?: T | ValidTags;
} & (ComponentPropsWithoutRef<T> & HTMLAttributes<HTMLOrSVGElement>);

const DEFAULT_TAG = "div" as const;
const CardWrapper = <T extends ValidTags = typeof DEFAULT_TAG>({
  children,
  className,
  is,
  as = DEFAULT_TAG,
  ...props
}: CardWrapperProps<T>) => {
  const Tag: ValidTags = as;

  return (
    <Tag
      {...props}
      data-is={is}
      className={cn(
        `relative z-10 flex flex-col items-center justify-center rounded-lg bg-bogoss-300/70 py-3 [&>h4]:text-bogoss-200 [&>h4]:text-center text-balance gap-2 transition-all aspect-square glassy-lise`,
        className
      )}>
      {children}
    </Tag>
  );
};

export default CardWrapper;
