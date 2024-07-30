import { type ValidTags } from "@/components/Tag";
import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

type CardWrapperProps<T extends ValidTags> = {
  is: string;
  as?: T | ValidTags;
  glassy?: boolean;
} & HTMLAttributes<HTMLOrSVGElement>;

const DEFAULT_TAG = "div" as const;
const CardWrapper = <T extends ValidTags = typeof DEFAULT_TAG>({
  children,
  className,
  is,
  glassy = true,
  as = DEFAULT_TAG,
  ...props
}: CardWrapperProps<T>) => {
  const Tag: ValidTags = as;
  return (
    <Tag
      {...props}
      as={as}
      data-type={is}
      className={cn("card-wrapper", glassy ? "glassy-lise" : "none-glassy-lise", className)}>
      {children}
    </Tag>
  );
};

export default CardWrapper;
