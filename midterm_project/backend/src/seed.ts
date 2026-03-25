import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { Job } from './models/Job';

dotenv.config();

const seedJobs = [
  {
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc',
    description: 'Build modern web applications with React and CSS',
    requiredSkills: ['React', 'CSS', 'JavaScript']
  },
  {
    title: 'Backend Developer',
    company: 'Acme Corp',
    description: 'Develop scalable backend services',
    requiredSkills: ['Node.js', 'TypeScript', 'MongoDB']
  },
  {
    title: 'Mobile Developer',
    company: 'Mobile Apps LLC',
    description: 'Create cross-platform mobile applications',
    requiredSkills: ['React Native', 'TypeScript']
  },
  {
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    description: 'Manage infrastructure and deployment pipelines',
    requiredSkills: ['Docker', 'AWS', 'Linux']
  },
  {
    title: 'Full Stack Developer',
    company: 'Startup Ventures',
    description: 'Work on both frontend and backend development',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript']
  }
];

const seed = async () => {
  try {
    await connectDB();
    
    await Job.deleteMany({});
    console.log('Cleared existing jobs');
    
    await Job.insertMany(seedJobs);
    console.log('✅ Seed data inserted successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seed();
