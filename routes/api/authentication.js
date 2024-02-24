import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/registration', async (req, res) => {
  const { fullname, email, password } = req.body;
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

export default router
