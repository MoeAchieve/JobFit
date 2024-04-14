import { JOB_STATUS, JOB_TYPE } from "@prisma/client";

export interface IExperience {
  id: string;
  company: ICompany;
  title: string;
  type: string;
  description: string;
  from: string;
  to: string;
  image: string;
  length?: string;
  location: string;
  current: boolean;
}

export interface IEducation {
  school: string;
  degree: string;
  field: string;
  from: string;
  to: string;
}

export interface ISkill {
  id: string;
  name: string;
}

export interface ILanguage {
  id: string;
  language: string;
}

export interface IProfile {
  bio: string;
  location: string;
  website: string;
  experiences: IExperience[];
  educations: IEducation[];
  skills: ISkill[];
  languages: ILanguage[];
}

export interface ICompany {
  id: string;
  name: string;
  location: string;
  website: string;
  description: string;
  image: string;
}

export interface IJob {
  id: string;
  title: string;
  description: string;
  company: ICompany;
  location: string;
  userId: string;
  status: JOB_STATUS;
  applicants: IApplication[];
  type: string;
  image: string;
  // createdAt: string;
  // updatedAt: string;
}

export interface IApplication {
  id: string;
  jobId: string;
  userId: string;
  status: JOB_STATUS;
  resume: string;
  coverLetter: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobsQuery {
  location?: string;
  type?: JOB_TYPE;
  status?: JOB_STATUS;
}
