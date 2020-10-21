import express from 'express';
import User from '../schemas/User.js';
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { firstName, lastName, age, picture, email } = req.body;
    if (!email?.trim()) {
      throw new Error('email is mandatory');
    }
    const user = await User.create({
      firstName,
      lastName,
      age,
      email,
      picture,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      res.json({ error: 'duplicate entry', detail: err.keyValue });
      return;
    }
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch {
    res.json({ error: err.message || err.toString() });
  }
});

export default router;
