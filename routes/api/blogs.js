import express from 'express';
import multer from 'multer';

import Blog from '../../models/Blog.js'

const router = express.Router();


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });

router.post('/blogs/image', upload.single('image'), async (req, res) => {
  try {
    res.json({ imageUrl: req.file.path });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/blogs', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    imageUrl: "upload/" + req.body.imageUrl,
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.delete('/blogs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully", deletedBlog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



export default router
