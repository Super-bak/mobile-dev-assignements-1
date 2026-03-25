import { Request } from 'express';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: 'employer' | 'jobseeker';
  skills: string[];
  createdAt: Date;
}

export interface IJob {
  _id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  createdAt: Date;
}

export interface AuthRequest extends Request {
  userId?: string;
}
