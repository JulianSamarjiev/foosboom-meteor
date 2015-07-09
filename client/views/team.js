Template.team.helpers({
  isEditingTeam: function(){
    return Session.get('editedTeamId') === this._id;
  }
});

Template.team.events({
  "click a.edit": function(e, tpl){
    e.preventDefault();
    Session.set('editedTeamId', this._id);
  },

  "submit form.form-edit": function(e, tpl){
    e.preventDefault();

    var teamName = tpl.$('input[name="name"]').val();
    var self = this;

    if(teamName.length){
      Teams.update(this._id, {$set: {name: teamName}}, function(error){

        if(!error){

          // Update games this team is a part of
          var games = Games.find({_id: {$in: self.gameIds}});
          if(games.count()){
            _(games.fetch()).each(function(game){
              var teams = _(game.teams).findWhere({_id: self._id});
              if(team != null){
                teams.name = teamName;
                Games.update({_id: game._id}, {$set: {teams: game.teams}})
              }
            });
          }
        }
      });

      Session.set('editedTeamId', null);
    }
  },

  "click a.cancel": function(e, tpl){
    e.preventDefault();
    Session.set('editedTeamId', null);
  },

  'click a.remove': function(e, tpl){
    e.preventDefault();
    Teams.remove(this._id);
  }
});
