const express = require("express");
const { Featured } = require("../models/featured");
const { ProjectCategory } = require("../models/project");

const app = express();

app.get("/featured/:category/:id", async (req, res) => {
  const projectCategory = await ProjectCategory.findOne({
    name: req.params.category,
  });
  const projectIndex = await projectCategory.projects.findIndex(
    (item) => item._id == req.params.id
  );
  projectCategory.projects[projectIndex].featured = true;
  await projectCategory.save();

  let featuredProject = projectCategory.projects[projectIndex];
  const featured = new Featured({
    thumbnail: featuredProject.thumbnail,
    name: featuredProject.name,
    location: featuredProject.location,
    startYear: featuredProject.startYear,
    endYear: featuredProject.endYear,
    content: featuredProject.content,
    mainImg: featuredProject.mainImg,
    imgs: featuredProject.imgs,
    category: projectCategory.name,
  });
  await featured.save();

  try {
    res.redirect("/edit-project");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/un-feature/:category/:id", async (req, res) => {
  const projectCategory = await ProjectCategory.findOne({
    name: req.params.category,
  });
  const projectIndex = await projectCategory.projects.findIndex(
    (item) => item._id == req.params.id
  );
  projectCategory.projects[projectIndex].featured = false;
  await projectCategory.save();

  let featuredProject = projectCategory.projects[projectIndex];
  const doc = await Featured.deleteOne({
    name: featuredProject.name,
    location: featuredProject.location,
  });

  try {
    res.redirect("/edit-project");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
