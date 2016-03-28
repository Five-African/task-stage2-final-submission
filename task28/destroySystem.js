var DestroySystem = function(ship) {
  this.ship = ship;
};
DestroySystem.prototype.destroy = function() {
  if (this.ship.state == -1) return;
  this.ship.state = -1;
  Logger.log('destroy', this.ship);
}
