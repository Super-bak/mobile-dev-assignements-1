import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.191:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'An error occurred. Please try again.';
};

export interface RegisterData {
  username: string;
  password: string;
  role: 'employer' | 'jobseeker';
}

export interface LoginData {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  role: 'employer' | 'jobseeker';
  skills: string[];
  createdAt: string;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  employerId: string;
  createdAt: string;
  matchPercentage?: number;
  matchingSkills?: string[];
}

export interface Application {
  _id: string;
  jobId: any;
  jobseekerId: any;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Message {
  _id: string;
  applicationId: string;
  senderId: any;
  text: string;
  createdAt: string;
}

export const authAPI = {
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  updateSkills: async (skills: string[]) => {
    const response = await api.put('/user/skills', { skills });
    return response.data;
  },
};

export const jobsAPI = {
  getAll: async (): Promise<Job[]> => {
    const response = await api.get('/jobs');
    return response.data;
  },
  getById: async (id: string): Promise<Job> => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  create: async (jobData: { title: string; company: string; description: string; requiredSkills: string[] }) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },
};

export const applicationsAPI = {
  apply: async (jobId: string) => {
    const response = await api.post('/applications', { jobId });
    return response.data;
  },
  getMyApplications: async (): Promise<Application[]> => {
    const response = await api.get('/applications/my-applications');
    return response.data;
  },
  getJobApplications: async (jobId: string): Promise<Application[]> => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },
  updateStatus: async (applicationId: string, status: 'accepted' | 'rejected') => {
    const response = await api.put(`/applications/${applicationId}/status`, { status });
    return response.data;
  },
};

export const messagesAPI = {
  send: async (applicationId: string, text: string) => {
    const response = await api.post('/messages', { applicationId, text });
    return response.data;
  },
  getMessages: async (applicationId: string): Promise<Message[]> => {
    const response = await api.get(`/messages/${applicationId}`);
    return response.data;
  },
};

export default api;
