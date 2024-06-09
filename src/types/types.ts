export type SkillFilter = "tous" | "front-end" | "back-end";
export type XpFilter = "tous" | "pro" | "formation";
export type ProjectFilter = "tous" | "web" | "outil" | "documentation";

export type SkillType = {
  id: number;
  title: string;
  level: string;
  type: string[];
  description: string;
};

export type ProjectType = {
  id: number;
  title: string;
  type: string[];
  href: string;
};

export type ExperienceType = {
  id: number;
  type: string;
  title: string;
  company: string;
  date: string;
  duration: string;
  subtitle: string;
  program: string[];
  lieu?: string;
  status?: string;
  level?: string;
};

export type FormationType = {
  id: number;
  type: string;
  title: string;
  lieu: string;
  duration: string;
  level: string;
  date: string[];
  status: string;
};
