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
app.get("/media", function (req, res) {
    res.render("media");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/blog", function (req, res) {
  res.render("blog");
});
  
//route for magic page
// app.get("/magic", function (req, res) {
//   res.render("magic");
// });

app.listen(3000, function () {
  console.log("Server is running on port 3000 ");
});
