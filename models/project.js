const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  startYear: {
    type: String,
  },
  endYear: {
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
  featured: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
const Featured = mongoose.model("Featured", ProjectSchema);

const ProjectCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  projects: {
    type: [ProjectSchema],
    default: [],
  },
});

const ProjectCategory = mongoose.model(
  "ProjectCategory",
  ProjectCategorySchema
);

module.exports = { Project, Featured, ProjectCategory };
