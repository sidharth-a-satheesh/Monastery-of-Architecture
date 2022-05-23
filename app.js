require("dotenv").config();
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const ContactRouter = require("./routes/contact");
const MessageRouter = require("./routes/message");
const AboutRouter = require("./routes/about");
const MediaRouter = require("./routes/media");
const BlogRouter = require("./routes/blog");
const ProjectRouter = require("./routes/project");
const FeaturedRouter = require("./routes/featured");
const AdminRouter = require("./routes/admin");
const HomeRouter = require("./routes/home");
const Admin = require("./models/admin");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ContactRouter);
app.use(MessageRouter);
app.use(AboutRouter);
app.use(MediaRouter);
app.use(BlogRouter);
app.use(ProjectRouter);
app.use(AdminRouter);
app.use(FeaturedRouter);
app.use(HomeRouter);

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running at port 3000");
});
