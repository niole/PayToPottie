Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();
    Meteor.loginWithPassword(email, password, function(error){
      if (error) {
        throw Error(error);
      }
    })
    var _id = Meteor.userId();
    console.log(_id);
    if (_id) {
      Router.go('/bathrooms');
    } else {
      throw Error("this user id doesn't exist or user isn't "+
                   "being logged in.");
    }
  },
  'click .register': function(event){
    event.preventDefault();
    Session.set('showRegister', true);
  }
});
