var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var logger = require("../utils/logger");

var boardBackgroundMap = { 
	"map" : [
	        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
          [0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],
          [0,0,0,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0], 
          [0,0,0,3,3,3,3,3,3,1,1,1,1,2,2,1,1,1,1,1,1,1,3,0],
          [0,0,0,3,3,3,3,3,3,1,1,1,1,1,2,2,2,1,1,1,1,1,3,0],
          [0,0,0,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,3,0],
          [0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],
        	[0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
	        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,3,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,3,1,1,3,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,3,1,1,1,1,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,3,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,3,1,1,1,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]};

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.setHeader("Content-Type", 'application/jsonp');
   res.jsonp(boardBackgroundMap);
});

router.get('/db', function(req, res, next) {
	
  logger.info("Building db query");
	var db = monk('localhost:27017/games');
	
  logger.info("Connection to collection");
  var base = db.get('base');
  
  logger.info("Running query");
  base.find(
    {},
    {limit : 1}, 
    function (err, doc) {
    if(err) return done(err);
    // logger.info("db result" +  JSON.stringify( doc, undefined, 4 ));
    res.setHeader("Content-Type", 'application/jsonp');
    res.jsonp(doc);
  });
 
});

module.exports = router;
