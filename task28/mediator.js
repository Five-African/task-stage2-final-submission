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
    registerDc: function(dc) {
      system[-1] = dc
    },
    transport: function(sender, target, data) {
      if (target <= 0 && sender <= 0) { // we are on the Earth
        system[target].receive(sender, data);
        return;
      }
      setTimeout(function() {
        if (loss()) {
          if (data > 0xff) return; // filter ship report
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
