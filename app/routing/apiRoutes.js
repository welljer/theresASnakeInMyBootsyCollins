var festivalsData = require("../data/festivals");


module.exports = function(app) {
  app.get("/api/festivals", function(req, res) {
    res.json(festivalsData);
  });

  app.post("/api/festivals", function(req, res) {
    console.log(req.body.scores);

    var user = req.body;

    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var myBestFriendsParty = 0;
    var minimumDifference = 40;

    for(var i = 0; i < festivalsData.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < festivalsData[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - festivalsData[i].scores[j]);
        totalDifference += difference;
      }

      if(totalDifference < minimumDifference) {
        myBestFriendsParty = i;
        minimumDifference = totalDifference;
      }
    }

    festivalsData.push(user);

    res.json(festivalsData[myBestFriendsParty]);
  });
};