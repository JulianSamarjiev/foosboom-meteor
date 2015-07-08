Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('games', function(){
  return Games.find();
});
