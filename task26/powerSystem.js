var PowerSystem = function(ship) {
  this.ship = ship;
  this.speed = 2;
  this.consume = 0.5;
  this.timer = null;
};
PowerSystem.prototype.run = function() {
  if (this.timer != null || this.ship.state == -1) return;
  if (this.ship.state == 0) {
    this.ship.state = 1;
  }
  this.timer = setInterval((function() {
    if (this.ship.state == -1) {
      this.stop();
      return;
    }
    if (this.ship.power >= this.consume) {
      this.ship.power -= this.consume;
      this.ship.position += this.speed;
      if (this.ship.position > 360)
        this.ship.position -= 360;
    }
    else {
      this.stop();
    }
  }).bind(this), 100);
  Logger.log('startup', this.ship);
}
PowerSystem.prototype.stop = function() {
  if (this.timer == null || this.ship.state == -1) return;
  if (this.ship.state == 1) {
    this.ship.state = 0;
  }
  clearInterval(this.timer);
  this.timer = null;
  Logger.log('shutdown', this.ship);
}
