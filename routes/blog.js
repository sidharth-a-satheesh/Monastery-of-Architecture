const express = require("express");
const Blog = require("../models/blog");
const { toJsFormat } = require("../services/formatDate");
const app = express();
const Auth = require("../auth");
app.use(Auth);

const {
  upload,
  unlinkFile,
  uploadFile,
  deleteFile,
} = require("../services/s3");

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});

  try {
    res.render("blog", { blogs });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  try {
    res.render("blog-landing", { blog });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/add-blog", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/admin");
  }

  res.render("admin/a-blog-add");
});

app.post(
  "/blogs",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect("/admin");
    }

    let reqBody = { ...req.body };
    if (req.files.thumbnail) {
      const thumbnail = await uploadFile(req.files.thumbnail[0]);
      await unlinkFile(req.files.thumbnail[0].path);
      reqBody = { ...reqBody, thumbnail: thumbnail.Location };
    }
    if (req.files.img) {
      const img = await uploadFile(req.files.img[0]);
      await unlinkFile(req.files.img[0].path);
      reqBody = { ...reqBody, img: img.Location };
    }

    const blog = new Blog(reqBody);

    try {
      await blog.save();
      res.redirect("/edit-blog");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.get("/edit-blog", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/admin");
  }

  const blogs = await Blog.find({});

  try {
    res.render("admin/a-blog", { blogs });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-blog/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/admin");
  }

  const blog = await Blog.findOne({ _id: req.params.id });

  let date = await toJsFormat(blog.date);

  try {
    res.render("admin/a-blog-edit", { blog, date });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/edit-blog/:id",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "img",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    if (!req.isAuthenticated()) {
      res.redirect("/admin");
    }

    let reqBody = { ...req.body };
    if (req.files.thumbnail) {
      const blog = await Blog.findById(req.params.id);
      await deleteFile(blog.thumbnail);
      const thumbnail = await uploadFile(req.files.thumbnail[0]);
      await unlinkFile(req.files.thumbnail[0].path);
      reqBody = { ...reqBody, thumbnail: thumbnail.Location };
    }
    if (req.files.img) {
      const blog = await Blog.findById(req.params.id);
      await deleteFile(blog.img);
      const img = await uploadFile(req.files.img[0]);
      await unlinkFile(req.files.img[0].path);
      reqBody = { ...reqBody, img: img.Location };
    }

    const doc = await Blog.findOneAndUpdate({ _id: req.params.id }, reqBody, {
      new: true,
    });

    try {
      res.redirect("/edit-blog");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.post("/delete-blog/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/admin");
  }

  const doc = await Blog.deleteOne({ _id: req.params.id });

  try {
    res.redirect("/edit-blog");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
