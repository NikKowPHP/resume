export interface PersonalInfo {
  name: string;
  title: string;
  image: string;
  professionalObjective: string;
  status: string;
}

export interface Contact {
  text: string;
  url?: string;
  svgPath: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  url: string;
  description: string;
  stack: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  contact: Contact[];
  skills: SkillCategory[];
  languages: Language[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}
