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

interface Experience {
  id: number;
  type: string;
  title: string;
  lieu: string;
  date: string[];
  duration: string;
  description: string;
}

export interface ProType extends Experience {
  company: string;
  subtitle: string;
  program: string[];
}

export interface FormationType extends Experience {
  level: string;
  status: string;
}
