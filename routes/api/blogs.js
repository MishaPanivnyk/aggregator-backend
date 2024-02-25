import express from 'express';
import Blog from '../../models/Blog.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogImg")
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

const router = express.Router();

router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.post('/blogs', upload.single("image"), async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    imageUrl: req.file ? req.file.filename : null,
    category: req.body.category
  });
  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
    res.redirect('/blogs')
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.get('/blogs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
