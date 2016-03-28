/* 造船厂 */
var ShipFactory = (function() {
  var ships = [];
  var count = 1;

  /* 机密 */
  var Ship = function(id, ps, ss) {
    this.id = id;
    this.state = 0; // save ship state, -1 for destroy, 0 for stop, 1 for run
    this.power = 100;
    this.maxPower = 100;
    this.position = 0;
    this.powerSystem = PowerSystemFactory.create(this, ps);
    this.supplySystem = SupplySystemFactory.create(this, ss);
    this.destroySystem = new DestroySystem(this);
    this.notifySystem = new EncodeDecorator(new NotifySystem(this));
  }
  Ship.prototype.toString = function() { // let me know who are you
    return "Ship No. " + this.id;
  }
  Ship.prototype.dealMessage = function(message) {
    if (this.state == -1) return;
    if (message.id != this.id) return; // not send to me
    switch (message.command) {
      case "startup":
        this.powerSystem.run();
        break;
      case "shutdown":
        this.powerSystem.stop();
        break;
      case "destroy":
        this.destroySystem.destroy();
        Mediator.unregisterShip(this.id);
        ships.splice(ships.indexOf(this), 1);
        // will gc collect this instance?
        break;
      default:
        Logger.warn('喵喵喵？', this);
        break;
    }
    return {
      id: this.id,
      command: 'ack'
    };
  };

  return {
    create: function(ps, ss) {
      var ship = new Ship(count, ps, ss);
      ships.push(ship);
      Mediator.registerShip(ship.id, ship.notifySystem);
      Logger.log('created', ship);
      return count++;
    },
    getShips: function() {
      return ships;
    }
  };
})();
