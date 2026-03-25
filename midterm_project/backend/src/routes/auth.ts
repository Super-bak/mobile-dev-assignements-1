import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      res.status(400).json({ error: 'Username, password, and role are required' });
      return;
    }

    if (role !== 'employer' && role !== 'jobseeker') {
      res.status(400).json({ error: 'Role must be employer or jobseeker' });
      return;
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role,
      skills: []
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'your_secret_key_here';
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });

    res.json({
      token,
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

export default router;
