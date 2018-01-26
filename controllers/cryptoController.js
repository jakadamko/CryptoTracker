const path = require("path");
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");

router.get("/dashboard", function (req, res) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.redirect("/")
  }
});

router.get("/", function (req, res) {
  if (req.session.user) {
    res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

router.post("/api/coinwatched", function (req, res) {
  User.update({ _id: req.session.user._id }, { $push: { coins: { coinName: req.body.coinName, coinPrice: req.body.coinPrice } } })
      .then(function () {
          return User.findOne({ "username": req.session.user.username, "password": req.session.user.password })
      }).then(function (dbUser) {
          req.session.user = dbUser;
          res.redirect("/dashboard");
      })
      .catch(function (err) {
          res.json(err);
      })
});

router.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ "username": username, "password": password })
      .then(function (dbUser) {
          req.session.user = dbUser;
          res.redirect("/dashboard");
      })
      .catch(function (err) {
          res.json(err);
      });
});

router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
      if (err) {
          res.negotiate(err)
      }
      res.redirect("/");
  })
});

router.post("/register", function (req, res) {
  User.create(req.body)
      .then(function (dbUser) {
          res.json(dbUser);
      })
})

module.exports = router;
