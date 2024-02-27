import express from 'express';
import Blog from '../../models/Blog.js'
import cloudinary from 'cloudinary'
// html
import { dirname } from 'path'
import path from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
// html
cloudinary.config({
  cloud_name: 'vdoma',
  api_key: '649237283136974',
  api_secret: '8HkqvdO2LrTH3v2IAy7VVfmqEuk'
});

const router = express.Router();

router.get('/blogs', async (req, res) => {

  try {  
    const htmlFilePath = path.join(__dirname, '../../index.html');
    res.sendFile(htmlFilePath);
    const blogs = await Blog.find();
    //res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})



router.post('/blogs', async (req, res) => {
  try {  
    const result = await cloudinary.uploader.upload(req.files.image.path); 
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      imageUrl: result.secure_url,
      category: req.body.category
    });
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
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
