var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency


/* Set up mongoose in order to connect to mongo database */
mongoose.connect('mongodb://localhost/scoresDB'); //Connects to a mongo database called "scoresDB"
var scoreSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Score: Number
});
var Score = mongoose.model('Score', scoreSchema); //Makes an object from that schema as a model
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { Root: 'public' });
});

/* POST score route */
router.post('/score', function(req, res, next) {
  console.log("POST score route"); //[1]
  console.log(req.body); //[2]
  var newscore = new Score(req.body); //[3]
  console.log(newscore); //[3]
  newscore.save(function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

/* GET scores from database */
router.get('/score', function(req, res, next) {
  console.log("In the GET route!");
  Score.find(function(err,scoreList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(scoreList); //Otherwise console log the comments you found
      res.json(scoreList); //Then send them
      
    }
  })
});

module.exports = router;

