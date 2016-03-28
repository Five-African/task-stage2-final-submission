var PowerSystemFactory = (function() {

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

var PowerSystemType1 = function(ship) {
  this.ship = ship;
  this.speed = 3;
  this.consume = 0.5;
  this.timer = null;
}
PowerSystemType1.prototype = new PowerSystem();
PowerSystemType1.prototype.constructor = PowerSystemType1;
PowerSystemType1.prototype.type = '前进号';

var PowerSystemType2 = function(ship) {
  this.ship = ship;
  this.speed = 5;
  this.consume = 0.7;
  this.timer = null;
}
PowerSystemType2.prototype = new PowerSystem();
PowerSystemType2.prototype.constructor = PowerSystemType2;
PowerSystemType2.prototype.type = '奔腾号';

var PowerSystemType3 = function(ship) {
  this.ship = ship;
  this.speed = 8;
  this.consume = 0.9;
  this.timer = null;
}
PowerSystemType3.prototype = new PowerSystem();
PowerSystemType3.prototype.constructor = PowerSystemType3;
PowerSystemType3.prototype.type = '超越号';

return {
  create: function(ship, type) {
    switch (type) {
      case 1:
        return new PowerSystemType1(ship);
      case 2:
        return new PowerSystemType2(ship);
      case 3:
        return new PowerSystemType3(ship);
      default:
        return new PowerSystem(ship);
    }
  }
}

})();
