import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithoutRef, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";

export type ValidTags = keyof JSX.IntrinsicElements;
type TagProps<T extends ValidTags> = {
  as?: T | ValidTags;
} & (ComponentPropsWithoutRef<T> & HTMLAttributes<HTMLOrSVGElement> & PropsWithoutRef<ComponentProps<T>>);

const DEFAULT_TAG = "div" as const;

const Tag = <T extends ValidTags = typeof DEFAULT_TAG>({
  children,
  className,
  as = DEFAULT_TAG,
  ...props
}: TagProps<T>) => {
  const Tag: ValidTags = as;

  return (
    <Tag {...props} className={cn(className)}>
      {children}
    </Tag>
  );
};

export default Tag;
