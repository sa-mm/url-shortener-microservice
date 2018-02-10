var mongo = require("mongodb").MongoClient;
var validUrl = require("valid-url");

var createShortUrl = function(req) {
  var rand = Math.floor(Math.random() * 1000000);
  var shortUrl = req.protocol + "://" + req.headers.host + "/" + rand;
  return shortUrl;
};

var shortener = function(req, res) {
  var re = /^\/new\//;
  var url = req.path.replace(re, "");
  if (validUrl.isUri(url)) {
    var shortUrl = createShortUrl(req);
    var mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/urls";

    mongo.connect(mongoUrl, function(err, db) {
      if (err) {
        console.log("Unable to connect to the mongoDB server. Error:", err);
      } else {
        // do some work here with the database.
        var collection = db.collection("urlcollection");
        var urlGuard = function(url, shortUrl) {
          collection.findOne(
            {
              short_url: shortUrl
            },
            {
              original_url: 1,
              short_url: 1,
              _id: 0
            },
            guardCb(url, shortUrl)
          );
        };

        var guardCb = function(url, shortUrl) {
          return function(err, result) {
            if (err) {
              console.log("err", err);
              db.close();
            } else {
              if (result) {
                var newShortUrl = createShortUrl(req);
                urlGuard(url, newShortUrl);
              } else {
                find(url, shortUrl);
              }
            }
          };
        };
        var find = function(url, shortUrl) {
          collection.findOne(
            {
              original_url: url
            },
            {
              original_url: 1,
              short_url: 1,
              _id: 0
            },
            findUrlCallback(url, shortUrl)
          );
        };
        var findUrlCallback = function(url, shortUrl) {
          return function(err, result) {
            if (err) {
              console.log(err);
              db.close();
            } else {
              if (result) {
                res.json(result);
                db.close();
              } else {
                insert(url, shortUrl);
              }
            }
          };
        };
        var insert = function(url, shortUrl) {
          collection.insertOne(
            {
              original_url: url,
              short_url: shortUrl
            },
            insertCallback(url, shortUrl)
          );
        };
        var insertCallback = function(url, shortUrl) {
          return function(err, result) {
            if (err) {
              console.log(
                "There was a problem adding the object to the collection"
              );
              console.log(err);
            } else {
              find(url, shortUrl);
            }
            db.close();
          };
        };

        urlGuard(url, shortUrl);
      }
    });
  } else {
    var err = "Not a URI";
    console.log(err);
    res.json({ error: err });
  }
};

module.exports = shortener;
