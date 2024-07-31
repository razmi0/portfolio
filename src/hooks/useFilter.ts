import type { ProjectFilter, SkillFilter, XpFilter } from "@/types";
import { useState } from "react";

export type Filters = {
  skills: SkillFilter;
  xp: XpFilter;
  projects: ProjectFilter;
};

const values = {
  skills: ["all", "front-end", "back-end"] as const,
  xp: ["all", "pro", "education"] as const,
  projects: ["all", "web", "tool", "documentation"] as const,
};

const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    skills: "all",
    xp: "all",
    projects: "all",
  });

  type ValueType<T> = T extends "skills" ? SkillFilter : T extends "xp" ? XpFilter : ProjectFilter;
  const handleFilterChange = <T>(field: keyof Filters & T, value: ValueType<T>) =>
    setFilters({ ...filters, [field]: value });

  return { filters, handleFilterChange, values };
};

export default useFilters;
