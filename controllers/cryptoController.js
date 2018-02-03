const path = require("path");
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
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
