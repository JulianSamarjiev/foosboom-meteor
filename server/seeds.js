Meteor.startup(function () {
  if (Teams.find().count() === 0) {
    // Create some teams
    [
      {
        name: "Barcelona",
        gameIds: []
      },
      {
        name: "Real Madrid",
        gameIds: []
      },
      {
        name: "Levski",
        gameIds: []
      }
    ].forEach(function(team) {
      Teams.insert(team);
    });

    // Create a game
    var team1 = Teams.find().fetch()[0];
    var team2 = Teams.find().fetch()[1];

    var game = {
      completed: false,
      createdAt: new Date(),
      teams: [
        {name: team1.name, _id: team1._id, score: 0},
        {name: team2.name, _id: team2._id, score: 0}
      ]
    };

    gameId = Games.insert(game);

    // Add this game to both teams gameIds
    Teams.update({_id: team1._id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: team2._id}, {$addToSet: { gameIds: gameId}})
  }
});
