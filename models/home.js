const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
});

const Home = mongoose.model("Home", HomeSchema);

module.exports = Home;
