import { useMemo } from "react";

const layouts = ["grid-config-1", "grid-config-2", "grid-config-3", "grid-config-4"];

const useImageGrid = (size: number, srcs: string[]) => {
  const config = useMemo(() => {
    const boundedSize = Math.max(1, Math.min(size, 4));
    return {
      layout: layouts[boundedSize - 1],
      images: srcs.slice(0, 4).filter((src) => src),
    };
  }, [size, srcs]);

  return config;
};

export default useImageGrid;
