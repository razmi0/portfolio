import type { ProjectFilter, SkillFilter, XpFilter } from "@/types/types";
import { useState } from "react";

type Filters = {
  skills: SkillFilter;
  xp: XpFilter;
  projects: ProjectFilter;
};

const values = {
  skills: ["tous", "front-end", "back-end"] as const,
  xp: ["tous", "pro", "formation"] as const,
  projects: ["tous", "web", "outil", "documentation"] as const,
};

const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    skills: "tous",
    xp: "tous",
    projects: "tous",
  });

  type ValueType<T> = T extends "skills" ? SkillFilter : T extends "xp" ? XpFilter : ProjectFilter;
  const handleFilterChange = <T>(field: keyof Filters & T, value: ValueType<T>) => {
    setFilters({ ...filters, [field]: value });
  };

  return { filters, handleFilterChange, values };
};

export default useFilters;
