var DC = (function() {
  var shipData = {};
  var dc = {
    update: function(data) {
      var ship = shipData[data.id];
      ship.state = data.state;
      ship.power = data.power;
      ship.time = new Date().toString();
    },
    dealMessage: function(message) {
      dc.update(message);
    },
    addShip: function(data) {
      shipData[data.id] = {
        id: data.id,
        powerSystem: data.powerSystem,
        supplySystem: data.supplySystem,
        state: 0,
        power: 100,
        time: new Date().toString()
      };
    },
    removeShip: function(id) {
      delete shipData[id];
    },
    getData: function() {
      return shipData;
    },
    toString: function() {
      return "DC";
    }
  };

  dc.notifySystem = new EncodeDecorator(new NotifySystem(dc));
  Mediator.registerDc(dc.notifySystem);
  return dc;
})();
