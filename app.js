const express = require("express"),
  app = express();

//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//route for index page
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/projects", function (req, res) {
    res.render("projects");
});
app.get("/project-landing", function (req, res) {
  res.render("project-landing");
});
app.get("/project-landing", function (req, res) {
  res.render("project-landing");
});
app.get("/media", function (req, res) {
    res.render("media");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/blog", function (req, res) {
  res.render("blog");
});
app.get("/blog-landing", function (req, res) {
  res.render("blog-landing");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});


//route for admin page
app.get("/admin", function (req, res) {
  res.render("admin/a-index");
});

app.get("/admin/projects", function (req, res) {
    res.render("admin/a-projects");
});
app.get("/admin/project-landing", function (req, res) {
  res.render("admin/a-project-landing");
});
app.get("/admin/project-landing", function (req, res) {
  res.render("admin/a-project-landing");
});
app.get("/admin/media", function (req, res) {
    res.render("admin/a-media");
});
app.get("/admin/about", function (req, res) {
  res.render("admin/a-about");
});
app.get("/admin/blog", function (req, res) {
  res.render("admin/a-blog");
});
app.get("/admin/blog-landing", function (req, res) {
  res.render("admin/a-blog-landing");
});
app.get("/admin/contact", function (req, res) {
  res.render("admin/a-contact");
});

app.get("/admin/messages", function (req, res) {
  res.render("admin/a-messages");
});
  
app.get("/admin/edit-category", function (req, res) {
  res.render("admin/a-edit-category");
});

//route for magic page
// app.get("/magic", function (req, res) {
//   res.render("magic");
// });

app.listen(process.env.PORT || 3000,() => {
  console.log("Server is running on port 3000 ");
});
