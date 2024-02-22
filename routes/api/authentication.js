import express from 'express';

const router = express.Router();

router.get('/login', async (req, res) => {
  res.json({ message: 'template message' })
})

router.get('/registration', async (req, res) => {
  res.json({ message: 'template message' })
})

export default router
