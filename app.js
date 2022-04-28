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
//route for magic page
// app.get("/magic", function (req, res) {
//   res.render("magic");
// });

app.listen(process.env.PORT || 3000,() => {
  console.log("Server is running on port 3000 ");
});
