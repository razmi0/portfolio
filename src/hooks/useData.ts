import { useMemo } from "react";
import { formation, projects, skills, xp } from "../data.json";

export const useData = () => {
  return useMemo(() => {
    return { formation, projects, skills, xp };
  }, []);
};
