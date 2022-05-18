const express = require("express");
const app = express();
const About = require("../models/about");

const {
  upload,
  unlinkFile,
  uploadFile,
  getFileStream,
  deleteFile,
} = require("../services/s3");

app.get("/images/:key", (req, res) => {
  const readStream = getFileStream(req.params.key);
  readStream.pipe(res);
});

app.get("/about", async (req, res) => {
  const about = await About.find({});

  try {
    res.send(about);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/about", upload.single("img"), async (req, res) => {
  let reqBody;
  if (req.file) {
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    reqBody = { ...req.body, img: result.Key };
  } else {
    reqBody = { ...req.body };
  }

  const about = new About(reqBody);

  try {
    await about.save();
    res.send(about);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-about", async (req, res) => {
  const about = await About.find({});

  try {
    res.send(about);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/about", upload.single("img"), async (req, res) => {
  let reqBody;
  if (req.file) {
    const about = await About.findOne({ id: 1 });
    await deleteFile(about.img);
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    reqBody = { ...req.body, img: result.Key };
  } else {
    reqBody = { ...req.body };
  }

  const doc = await About.findOneAndUpdate({ id: 1 }, reqBody, {
    new: true,
  });

  try {
    res.send(doc);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
