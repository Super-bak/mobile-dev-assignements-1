import express, { Response } from 'express';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();

router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      skills: user.skills,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

router.put('/skills', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      res.status(400).json({ error: 'Skills must be an array' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { skills },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      message: 'Skills updated successfully',
      skills: user.skills
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating skills' });
  }
});

export default router;
