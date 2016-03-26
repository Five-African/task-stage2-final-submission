var NotifySystem = function(host) {
  this.host = host;
};
NotifySystem.prototype.notify = function(sender, message) {
  if (!(sender instanceof NotifySystem)) return; // Hey, I do not know you
  this.host.dealMessage(message);
};
NotifySystem.prototype.feedback = function(sender, message) {} // no need
