var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');



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
        ] };

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.setHeader("Content-Type", 'application/jsonp');
   res.jsonp(boardBackgroundMap);
});

router.get('/db', function(req, res, next) {
	console.log("Building db query");
	var db = monk('localhost:27017/games');
	
	console.log("connection to collection");
    var base = db.get('base');
    
    console.log("Running query");
    base.find({},{ stream: true })
    .each(function(doc){
       res.setHeader("Content-Type", 'application/jsonp');
       res.jsonp(doc.map);
    })
  	.error(function(err){
  		 console.log("logging a fucking error"); 
  	})
  	.success(function(){});
   
  
});

module.exports = router;
