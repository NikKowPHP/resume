export type LanguageCode = 'fr' | 'en' | 'pl' | 'de';

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
  stack_title: string;
  stack: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface CVData {
  sections: {
    contact: string;
    skills: string;
    languages: string;
    status: string;
    objective: string;
    experience: string;
    projects: string;
    education: string;
  };
  personalInfo: PersonalInfo;
  contact: Contact[];
  skills: SkillCategory[];
  languages: Language[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export type MultilingualCVData = Record<LanguageCode, CVData>;
