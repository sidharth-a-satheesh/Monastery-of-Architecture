// app.get("/project-landing", function (req, res) {
//   res.render("project-landing");
// });
// //route for admin page
// app.get("/admin", function (req, res) {
//   res.render("admin/a-index");
// });
// app.get("/admin/projects", function (req, res) {
//     res.render("admin/a-projects");
// });
// app.get("/admin/project-landing", function (req, res) {
//   res.render("admin/a-project-landing");
// });
// //route for magic page
// // app.get("/magic", function (req, res) {
// //   res.render("magic");
// // });

require("dotenv").config();
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

// Authentication
const session = require("express-session");
const passport = require("passport");

const ContactRouter = require("./routes/contact");
const MessageRouter = require("./routes/message");
const AboutRouter = require("./routes/about");
const MediaRouter = require("./routes/media");
const BlogRouter = require("./routes/blog");
const ProjectRouter = require("./routes/project");
const AdminRouter = require("./routes/admin");
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

//Authentication
app.use(
  session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

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

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/admin/project-landing", function (req, res) {
  res.render("admin/a-project-landing");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
