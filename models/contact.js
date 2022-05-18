const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  internship: {
    type: String,
  },
  career: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
