const express = require("express");
const { Project, ProjectCategory } = require("../models/project");
const app = express();

const {
  upload,
  unlinkFile,
  uploadFile,
  deleteFile,
} = require("../services/s3");

app.get("/projects", async (req, res) => {
  const projectCategories = await ProjectCategory.find({});

  try {
    res.render("projects", { projectCategories });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/projects/:category", async (req, res) => {
  const projectCategories = await ProjectCategory.find({});
  const projectCategory = await ProjectCategory.findOne({
    name: req.params.category,
  });

  try {
    res.render("projectsCategory", { projectCategories, projectCategory });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/projects/:category/:id", async (req, res) => {
  const projectCategory = await ProjectCategory.findOne({
    name: req.params.category,
  });

  const project = await projectCategory.projects.find(
    (item) => item._id == req.params.id
  );

  try {
    res.render("project-landing", { project });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/add-project-category", async (req, res) => {
  res.render("admin/a-project-category-add");
});

app.post("/add-project-category", async (req, res) => {
  const projectCategory = new ProjectCategory(req.body);

  try {
    await projectCategory.save();
    res.redirect("/edit-project");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/add-project", async (req, res) => {
  const projectCategories = await ProjectCategory.find({});

  try {
    res.render("admin/a-project-add.ejs", { projectCategories });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/projects",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "mainImg",
      maxCount: 1,
    },
    {
      name: "imgs",
      maxCount: 100,
    },
  ]),
  async (req, res) => {
    let reqBody = { ...req.body };
    if (req.files.thumbnail) {
      const thumbnail = await uploadFile(req.files.thumbnail[0]);
      await unlinkFile(req.files.thumbnail[0].path);
      reqBody = { ...reqBody, thumbnail: thumbnail.Location };
    }
    if (req.files.mainImg) {
      const mainImg = await uploadFile(req.files.mainImg[0]);
      await unlinkFile(req.files.mainImg[0].path);
      reqBody = { ...reqBody, mainImg: mainImg.Location };
    }
    if (req.files.imgs) {
      let imgs = [];
      for (let i = 0; i < req.files.imgs.length; i++) {
        let img = await uploadFile(req.files.imgs[i]);
        imgs.push(img.Location);
        await unlinkFile(req.files.imgs[i].path);
      }
      reqBody = { ...reqBody, imgs: imgs };
    }

    const project = new Project(reqBody);

    ProjectCategory.findOne(
      {
        name: req.body.category,
      },
      async function (err, projectCategory) {
        if (!err) {
          projectCategory.projects.push(project);
          await projectCategory.save();
          res.redirect("/edit-project");
        } else {
          res.status(500).send(error);
        }
      }
    );
  }
);

app.get("/edit-project-category", async (req, res) => {
  const projectCategories = await ProjectCategory.find({});

  try {
    res.render("admin/a-project-categories-edit", { projectCategories });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/edit-project-category/:id", async (req, res) => {
  const doc = await ProjectCategory.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );

  try {
    res.redirect("/edit-project");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/delete-project-category/:id", async (req, res) => {
  const doc = await ProjectCategory.deleteOne({ _id: req.params.id });

  try {
    res.redirect("/edit-project");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-project", async (req, res) => {
  const projectCategories = await ProjectCategory.find({});

  try {
    res.render("admin/a-projects", { projectCategories });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-project/:category", async (req, res) => {
  const projectCategories = await ProjectCategory.find({});
  const projectCategory = await ProjectCategory.findOne({
    name: req.params.category,
  });

  try {
    res.render("admin/a-projectsCategory", {
      projectCategories,
      projectCategory,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-project/:category/:id", async (req, res) => {
  const projectCategories = await ProjectCategory.findOne({});

  try {
    res.send(projectCategories);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
