var mongo = require('mongodb').MongoClient

var checkAndRedirect = function (req, res) {
  var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/urls'

  mongo.connect(mongoUrl, function (err, db) {
    if (err) {
      console.log(err)
    } else {
      var collection = db.collection('urlcollection')
      var shortUrl = req.protocol + '://' + req.hostname + ':' + (process.env.PORT || 3000) + req.path
      var find = function () {
        collection.findOne({
          'short_url': shortUrl
        }, {
            original_url: 1,
            short_url: 1,
            _id: 0
          }, findCallback)
      }
      var findCallback = function (err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
          if (result) {
            res.redirect(result.original_url)
          } else {
            var error = "Sorry, that isn't a shortened URL."
            res.send({error: error})
          }
        }
        db.close()
      }
      find()
    }
  })
}


module.exports = checkAndRedirect
