var Mediator = (function() { // named BUS
  var system = {};

  var loss = function() {
    return Math.random() < 0.1;
  }

  return {
    registerShip: function(id, ship) {
      system[id] = ship;
    },
    unregisterShip: function(id) {
      delete system[id];
    },
    registerHq: function(headQuater) {
      system[0] = headQuater;
    },
    transport: function(sender, target, data) {
      setTimeout(function() {
        if (loss()) {
          Logger.warn('packet from ' + sender + ' to ' + target + ' is lost', Mediator);
        } else {
          if (system[target] != null)
            system[target].receive(sender, data);
        }
      });
    },
    toString: function() {
      return "Mediator";
    }
  };
})();
