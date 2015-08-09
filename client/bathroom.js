Template.bathroom.onRendered(function() {
  Session.set('pageloadStart-' + this.data._id, undefined);
  if (typeof(this.data) !== "undefined") {
    startBathroomCountdown(this.data._id);
  }
});

Template.bathroom.helpers({
  positionInQueue: function() {
    // TODO
    var queue = Reservations
      .find({bathroomId: this._id}, {sort: { createdAt: 1}})
      .map(function(reservation) { return reservation.userId; });
    var position = queue.indexOf(Meteor.userId());
    return position > -1 ? (position + 1) + "" : "n/a";
  },
  queueLength: function() {
    return Reservations.find({ bathroomId: this._id }).count();
  },
  percentSinceLoad: function() {
    var bathroomId = this._id;
    var start = Session.get('pageloadStart-' + bathroomId);
    var countdown = Session.get('countdown-' + bathroomId) || 0;
    if (start === undefined && countdown !== 0) {
      Session.set('pageloadStart-' + bathroomId, countdown);
    }
    return (((countdown / start) || 0) * 100).toFixed(2) + "%";
  }
});