import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import authRouter from './routes/api/authentication.js';
import blogRouter from './routes/api/blogs.js';


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/', blogRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res) => {
  res.status(500).json({ message: err.message })
})

export default app
