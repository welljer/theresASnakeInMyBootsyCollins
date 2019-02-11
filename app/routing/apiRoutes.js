var path = require('path');

var festivals = require("../data/festivals.js");

module.exports = function(app) {
	// console.log('___ENTER apiRoutes.js___');

	app.get("/api/festival", function(req, res) {
		res.json(festivals);
	});

	app.post("/api/festival", function(req, res) {
		var userData = req.body;

		var userResponses = userData.scores;

		var matchName = "";
		var matchImage = "";
		var totalDifference = 10000; 

		for (var i = 0; i < festivals.length; i++) {
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(festivals[i].scores[j] - userResponses[j]);
			}
			// console.log('diff = ' + diff);

			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Festival name = ' + festivals[i].name);
				// console.log('Festival image = ' + festivals[i].photo);

				totalDifference = diff;
				matchName = festivals[i].name;
				matchImage = festivals[i].photo;
			}
		}

		festival.push(userData);

		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};