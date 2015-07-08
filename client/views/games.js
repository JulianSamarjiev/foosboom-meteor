Template.games.helpers({
  games: function(){
    return Games.find();
  },

  teams: function(){
    return Teams.find();
  },

  isCreatingGame: function(){
    return Session.get('isCreatingGame');
  }
});


Template.games.events({
  "click a.create": function(e, tpl){
    e.preventDefault();
    Session.set('isCreatingGame', true);
  },

  "click a.cancel": function(e, tpl){
    e.preventDefault();
    Session.set('isCreatingGame', false);
  },

  "submit form.form-create": function(e, tpl){
    e.preventDefault();

    var team1 = {
      _id: tpl.$("select[name=teamOne]").val(),
      name: tpl.$("select[name=teamOne] option:selected").text(),
      score: 0
    }

    var team2 = {
      _id: tpl.$("select[name=teamTwo]").val(),
      name: tpl.$("select[name=teamTwo] option:selected").text(),
      score: 0
    }

    var game = {
      createdAt: new Date(),
      teams: [team1, team2],
      completed: false
    }

    var gameId = Games.insert(game);

    // Add this game to both teams gameIds
    Teams.update({_id: team1._id}, {$addToSet: { gameIds: gameId}});
    Teams.update({_id: team2._id}, {$addToSet: { gameIds: gameId}});

    Session.set('isCreatingGame', false);
  }
});
