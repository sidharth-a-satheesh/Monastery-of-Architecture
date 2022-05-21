const express = require("express");
const Contact = require("../models/contact");
const app = express();

app.get("/contact", async (req, res) => {
  const contact = await Contact.findOne({ id: 1 });

  try {
    res.render("contact", { contact });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/contact", async (req, res) => {
  const contact = new Contact(req.body);

  try {
    await contact.save();
    res.send(contact);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/edit-contact", async (req, res) => {
  const contact = await Contact.findOne({ id: 1 });

  try {
    res.render("admin/a-contact", { contact });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/edit-contact", async (req, res) => {
  const doc = await Contact.findOneAndUpdate({ id: 1 }, req.body, {
    new: true,
  });

  try {
    res.render("admin/a-contact", { contact: doc });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
