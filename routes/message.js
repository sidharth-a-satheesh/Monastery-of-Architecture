const express = require("express");
const Message = require("../models/message");
const app = express();

app.get("/messages", async (req, res) => {
  const messages = await Message.find({});

  try {
    res.render("admin/a-messages", { messages });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/messages", async (req, res) => {
  const message = new Message(req.body);

  try {
    await message.save();
    res.redirect("/messages");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/delete-message", async (req, res) => {
  const doc = await Message.deleteOne({ _id: req.body._id });

  try {
    res.redirect("/messages");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
