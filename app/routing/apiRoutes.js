var festivals = require("../data/festivals.js");

module.exports = function(app) {


app.post('/api/festivals', function(req, res) {
    var difference = 40;
    var matchName = '';
    var matchPhoto = '';

    festivals.forEach(function(festival) {
        var matchedScoresArray = [];
        var totalDifference = 40;

        function add(total, num) {
            return total + num;
        }

        for (var i = 0; i < festival.scores.length; i++) {
            matchedScoresArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(festival.scores[i])));

        }

            totalDifference = matchedScoresArray.reduce(add, 0);

        if (totalDifference < difference) {
            difference = totalDifference;
            matchName = festival.name;
            matchPhoto = festival.photo;
        }
    });
        res.json({
            name: matchName,
            photo: matchPhoto
    });

        festivals.push(req.body);
    });
}