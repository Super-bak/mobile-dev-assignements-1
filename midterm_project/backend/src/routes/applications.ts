import express, { Response } from 'express';
import { Application } from '../models/Application';
import { Job } from '../models/Job';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();

router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || user.role !== 'jobseeker') {
      res.status(403).json({ error: 'Only jobseekers can apply to jobs' });
      return;
    }

    const { jobId } = req.body;

    if (!jobId) {
      res.status(400).json({ error: 'Job ID is required' });
      return;
    }

    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    const existingApp = await Application.findOne({ jobId, jobseekerId: req.userId });
    if (existingApp) {
      res.status(400).json({ error: 'Already applied to this job' });
      return;
    }

    const application = new Application({
      jobId,
      jobseekerId: req.userId,
      status: 'pending'
    });

    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error submitting application' });
  }
});

router.get('/my-applications', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const applications = await Application.find({ jobseekerId: req.userId })
      .populate('jobId')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching applications' });
  }
});

router.get('/job/:jobId', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    const user = await User.findById(req.userId);
    if (!user || (user.role !== 'employer' || job.employerId.toString() !== req.userId)) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('jobseekerId', 'username skills')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching applications' });
  }
});

router.put('/:applicationId/status', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    if (!status || !['accepted', 'rejected'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const application = await Application.findById(req.params.applicationId).populate('jobId');
    
    if (!application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    const job = application.jobId as any;
    if (job.employerId.toString() !== req.userId) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    application.status = status;
    await application.save();

    res.json({
      message: 'Application status updated',
      application
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating application' });
  }
});

export default router;
