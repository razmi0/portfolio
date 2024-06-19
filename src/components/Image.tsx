import { HTMLAttributes } from "react";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image = ({ ...props }: ImageProps) => {
  return <img {...props} decoding="async" loading="lazy" />;
};

export default Image;
