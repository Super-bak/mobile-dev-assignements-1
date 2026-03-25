import express, { Response } from 'express';
import { Job } from '../models/Job';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    
    const user = await User.findById(req.userId);
    const userSkills = user?.skills || [];

    const jobsWithMatch = jobs.map(job => {
      const matchingSkills = job.requiredSkills.filter(skill => 
        userSkills.includes(skill)
      );
      const matchPercentage = job.requiredSkills.length > 0
        ? Math.round((matchingSkills.length / job.requiredSkills.length) * 100)
        : 0;

      return {
        _id: job._id,
        title: job.title,
        company: job.company,
        description: job.description,
        requiredSkills: job.requiredSkills,
        createdAt: job.createdAt,
        matchPercentage,
        matchingSkills
      };
    });

    res.json(jobsWithMatch);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching jobs' });
  }
});

router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    const user = await User.findById(req.userId);
    const userSkills = user?.skills || [];

    const matchingSkills = job.requiredSkills.filter(skill => 
      userSkills.includes(skill)
    );
    const matchPercentage = job.requiredSkills.length > 0
      ? Math.round((matchingSkills.length / job.requiredSkills.length) * 100)
      : 0;

    res.json({
      _id: job._id,
      title: job.title,
      company: job.company,
      description: job.description,
      requiredSkills: job.requiredSkills,
      createdAt: job.createdAt,
      matchPercentage,
      matchingSkills
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching job' });
  }
});

router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || user.role !== 'employer') {
      res.status(403).json({ error: 'Only employers can create jobs' });
      return;
    }

    const { title, company, description, requiredSkills } = req.body;

    if (!title || !company || !description || !Array.isArray(requiredSkills)) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const job = new Job({
      title,
      company,
      description,
      requiredSkills,
      employerId: req.userId
    });

    await job.save();

    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error creating job' });
  }
});

export default router;
