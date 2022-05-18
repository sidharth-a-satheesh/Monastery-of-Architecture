const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  content: {
    type: String,
  },
});

const About = mongoose.model("About", AboutSchema);

module.exports = About;
