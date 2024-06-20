import { HTMLAttributes } from "react";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
}

const Image = ({ loading = "lazy", ...props }: ImageProps) => {
  return <img {...props} decoding="async" loading={loading} />;
};

export default Image;
