var NotifySystem = function(host) {
  this.host = host;
};
NotifySystem.prototype.send = function(target, message) {
  Mediator.transport(this.host.id, target, message);
};
NotifySystem.prototype.receive = function(sender, message) {
  var feedback = this.host.dealMessage(message);
  if (feedback != null) {
    this.host.notifySystem.send(sender, feedback);
  }
}
