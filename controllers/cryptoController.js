const path = require("path");
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

router.post("/api/coinwatched", function (req, res) {

  //Instead of req.session.user._id we have to get the id from the user through react so it's going to need something else here
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

router.get("/api/coins", function(req, res) {
  var results = [];
  var names = [];
  var abv = [];
  var prices = [];
  var percentages = [];
  var rating = [];
  axios.get("https://coinmarketcap.com/").then(function(response) {
    var $ = cheerio.load(response.data);

    $("a.currency-name-container").each(function(i, element) {
      var name = $(element).text();

      names.push(name);
    });
    $("a.price").each(function(i, element) {
      var price = $(element).text();

      prices.push(price);
    });
    $("span.hidden-xs").each(function(i, element) {
      var abvName = $(element).text();

      abv.push(abvName);
    });
    $("td.percent-24h").each(function(i, element) {
      var percent = $(element).text();

      percentages.push(percent);
    });
    for (var i = 0; i < names.length; i++) {
      results.push({
        abv: abv[i],
        name: names[i],
        price: prices[i],
        percent: percentages[i]
      });
    }
    res.json(results);
  });
});

module.exports = router;
