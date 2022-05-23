const express = require("express");
const app = express();
const Admin = require("../models/admin");
const passport = require("passport");
const Auth = require("../auth");
app.use(Auth);

app.get("/admin", async (req, res) => {
  res.render("admin/a-login");
});

app.post("/admin", async (req, res) => {
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(admin, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", { failureRedirect: "/admin" })(
        req,
        res,
        function () {
          res.redirect("/edit-home");
        }
      );
    }
  });
});

app.post("/admin/register", async (req, res) => {
  Admin.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.send("success");
        });
      }
    }
  );
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/admin");
});

module.exports = app;
