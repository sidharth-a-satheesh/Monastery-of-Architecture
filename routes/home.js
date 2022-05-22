const express = require("express");
const app = express();
const Home = require("../models/home");
const { Featured } = require("../models/featured");

const {
  upload,
  unlinkFile,
  uploadFile,
  getFileStream,
  deleteFile,
} = require("../services/s3");

app.get("/", async (req, res) => {
  const home = await Home.findOne({ id: 1 });
  const featured = await Featured.find({});

  try {
    res.render("index", { home, featured });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", upload.single("img"), async (req, res) => {
  let reqBody;
  if (req.file) {
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    reqBody = { ...req.body, img: result.Location };
  } else {
    reqBody = { ...req.body };
  }

  const home = new Home(reqBody);

  try {
    await home.save();
    res.send(home);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-home", async (req, res) => {
  const home = await Home.findOne({ id: 1 });
  res.render("admin/a-index", { home });
});

app.post("/edit-home", upload.single("img"), async (req, res) => {
  let reqBody;
  if (req.file) {
    const home = await Home.findOne({ id: 1 });
    await deleteFile(home.img);
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    reqBody = { ...req.body, img: result.Location };
  } else {
    reqBody = { ...req.body };
  }

  const doc = await Home.findOneAndUpdate({ id: 1 }, reqBody, {
    new: true,
  });

  try {
    res.render("admin/a-index", { home: doc });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/admin", async (req, res) => {
  res.render("admin/a-admin");
});

module.exports = app;
