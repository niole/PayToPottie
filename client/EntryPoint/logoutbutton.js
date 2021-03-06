Template.logoutButton.events({
  'click .logout-button': function(event) {
    event.preventDefault();
    Meteor.logout();
    Session.set('showRegister', false);
  }
});

Template.logoutButton.helpers({
  user: function() {
    if (Meteor.userId()) {
      return "Logout";
    }
  }
});
