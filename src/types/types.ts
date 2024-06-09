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
