var SupplySystem = function(ship) {
  this.ship = ship;
  this.supply = 0.2;
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
};
