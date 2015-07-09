Template.game.events({
  "click a.finish-game": function(e, tp1){
      e.preventDefault();
      Games.update({_id: this._id}, {$set: {completed: true}});
  },

  "click a.delete-game": function(e, tp1){
    e.preventDefault();
    var gameId = this._id;
    var teamIdA = this.teams[0]._id;
    var teamIdB = this.teams[1]._id;

    Games.remove(gameId, function (error) {
      if (!error) {
        Teams.update({_id: teamIdA}, {$pull: {gameIds: gameId}});
        Teams.update({_id: teamIdB}, {$pull: {gameIds: gameId}});
      }
    });
  },

  "click a.score": function(e, tp1){
    e.preventDefault();
    var data = $(e.currentTarget).data();
    var update = {$inc: {}};
    var selector = "teams." + data.index + ".score";
    update.$inc[selector] = data.inc;
    Games.update({_id: this._id}, update);
  }
});
