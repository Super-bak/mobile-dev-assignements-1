import express, { Response } from 'express';
import { Message } from '../models/Message';
import { Application } from '../models/Application';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();

router.post('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { applicationId, text } = req.body;

    if (!applicationId || !text) {
      res.status(400).json({ error: 'Application ID and text are required' });
      return;
    }

    const application = await Application.findById(applicationId).populate('jobId');
    
    if (!application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    if (application.status !== 'accepted') {
      res.status(403).json({ error: 'Can only message accepted applications' });
      return;
    }

    const job = application.jobId as any;
    const isEmployer = job.employerId.toString() === req.userId;
    const isJobseeker = application.jobseekerId.toString() === req.userId;

    if (!isEmployer && !isJobseeker) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const message = new Message({
      applicationId,
      senderId: req.userId,
      text
    });

    await message.save();

    res.status(201).json({
      message: 'Message sent',
      data: message
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error sending message' });
  }
});

router.get('/:applicationId', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const application = await Application.findById(req.params.applicationId).populate('jobId');
    
    if (!application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    const job = application.jobId as any;
    const isEmployer = job.employerId.toString() === req.userId;
    const isJobseeker = application.jobseekerId.toString() === req.userId;

    if (!isEmployer && !isJobseeker) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const messages = await Message.find({ applicationId: req.params.applicationId })
      .populate('senderId', 'username role')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching messages' });
  }
});

export default router;
