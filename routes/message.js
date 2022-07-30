const express = require("express");
const Message = require("../models/message");
const app = express();
const nodemailer = require("nodemailer");
const Auth = require("../auth");
app.use(Auth);

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_PASSWORD, 
  },
  secure: true,
});

app.get("/messages", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/admin");
  }

  const messages = await Message.find({});

  try {
    res.render("admin/a-messages", { messages });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/messages", async (req, res) => {
  const mailData = {
    from: req.body.email,
    to: process.env.TO_EMAIL,
    subject: "Message via MOA Website",
    text: req.body.message,
    // html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  const message = new Message(req.body);

  try {
    await message.save();
    res.redirect("/contact");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/delete-message", async (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/admin");
  }

  const doc = await Message.deleteOne({ _id: req.body._id });

  try {
    res.redirect("/messages");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
