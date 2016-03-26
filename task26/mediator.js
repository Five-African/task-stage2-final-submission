var Mediator = (function() {
  var ships = {};
  var hq = null;

  var loss = function() {
    return Math.random() < 0.3;
  }

  return {
    registerShip: function(id, ship) {
      ships[id] = ship;
    },
    registerHq: function(headQuater) {
      hq = headQuater;
    },
    notifyShips: function(id, data) {
      setTimeout(function() {
        if (!loss()) {
          ships[id].notify(hq, JSON.stringify(data));
        } else {
          Logger.warn('packet to ship ' + id + ' is lost', Mediator);
        }
      }, 1000);
    },
    toString: function() {
      return "Mediator";
    }
  };
})();
