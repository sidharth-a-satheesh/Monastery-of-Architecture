const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  logo: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Media = mongoose.model("Media", MediaSchema);

module.exports = Media;
