const express = require("express");
const Admin = require("../models/admin");
const app = express();

app.post("/admin/register", async (req, res) => {
  Admin.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

module.exports = app;
