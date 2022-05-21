const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
  },
  img: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
