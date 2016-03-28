var SupplySystemFactory = (function() {
  var SupplySystem = function(supply) {
    return function(ship) {
      this.ship = ship;
      this.supply = supply || 0.2;
      this.timer = setInterval((function() {
        if (this.ship.state == -1) {
          clearInterval(this.timer);
        } else {
          this.ship.power += this.supply;
          if (this.ship.power > this.ship.maxPower) {
            this.ship.power = this.ship.maxPower;
          }
        }
      }).bind(this), 100);
    }
  };

  var SupplySystemType1 = SupplySystem(0.2);
  SupplySystemType1.prototype.type = '劲量型';

  var SupplySystemType2 = SupplySystem(0.3);
  SupplySystemType2.prototype.type = '光能型';

  var SupplySystemType3 = SupplySystem(0.4);
  SupplySystemType3.prototype.type = '永久型';

  return {
    create: function(ship, type) {
      switch (type) {
        case 1:
          return new SupplySystemType1(ship);
        case 2:
          return new SupplySystemType2(ship);
        case 3:
          return new SupplySystemType3(ship);
        default:
          return new (SupplySystem())(ship);
      }
    }
  }
})();
