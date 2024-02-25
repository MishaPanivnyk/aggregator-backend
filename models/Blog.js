import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  imageUrl: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
}, {collection: 'blogs', versionKey: false});

export default mongoose.model("Blog", blogSchema);