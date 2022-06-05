const mongoose = require("mongoose");

const FeaturedSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  timeline: {
    type: String,
  },
  content: {
    type: String,
  },
  mainImg: {
    type: String,
  },
  imgs: {
    type: [String],
  },
  category: {
    type: String,
  },
});

const Featured = mongoose.model("Featured", FeaturedSchema);

module.exports = { Featured };
