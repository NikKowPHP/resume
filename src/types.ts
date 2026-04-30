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
  url?: string;
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
  description?: string;
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

// CHANGED: Added Partial<> to support gradual translation rollouts
export type MultilingualCVData = Partial<Record<LanguageCode, CVData>>;

export interface CVProfile {
  id: string;
  name: string;
  data: MultilingualCVData;
}

export type CVDatabase = CVProfile[];
