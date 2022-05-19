const express = require("express");
const Media = require("../models/media");
const app = express();

const {
  upload,
  unlinkFile,
  uploadFile,
  deleteFile,
} = require("../services/s3");

app.get("/media", async (req, res) => {
  const media = await Media.find({});

  try {
    res.render("media", { media });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/media",
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    let reqBody = { ...req.body };
    if (req.files.img) {
      const img = await uploadFile(req.files.img[0]);
      await unlinkFile(req.files.img[0].path);
      reqBody = { ...reqBody, img: img.Key };
    }
    if (req.files.logo) {
      const logo = await uploadFile(req.files.logo[0]);
      await unlinkFile(req.files.logo[0].path);
      reqBody = { ...reqBody, logo: logo.Key };
    }

    const media = new Media(reqBody);

    try {
      await media.save();
      res.send(media);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.get("/edit-media", async (req, res) => {
  const media = await Media.find({});

  try {
    res.render("admin/a-media", { media });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-media/:id", async (req, res) => {
  const media = await Media.findOne({ _id: req.params.id });

  try {
    res.send(media);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch(
  "/media/:id",
  upload.fields([
    {
      name: "img",
      maxCount: 1,
    },
    {
      name: "logo",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    let reqBody = { ...req.body };
    if (req.files.img) {
      const media = await Media.findById(req.params.id);
      await deleteFile(media.img);
      const img = await uploadFile(req.files.img[0]);
      await unlinkFile(req.files.img[0].path);
      reqBody = { ...reqBody, img: img.Key };
    }
    if (req.files.logo) {
      const media = await Media.findById(req.params.id);
      await deleteFile(media.logo);
      const logo = await uploadFile(req.files.logo[0]);
      await unlinkFile(req.files.logo[0].path);
      reqBody = { ...reqBody, logo: logo.Key };
    }

    const doc = await Media.findOneAndUpdate({ _id: req.params.id }, reqBody, {
      new: true,
    });

    try {
      res.send(doc);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

app.post("/delete-media/:id", async (req, res) => {
  const doc = await Media.deleteOne({ _id: req.params.id });

  try {
    res.redirect("/edit-media");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
