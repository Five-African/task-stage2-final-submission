var EncodeDecorator = function(notifySystem) {
  this.notifySystem = notifySystem;
  this.host = notifySystem.host;
};
EncodeDecorator.prototype.encode = function(message) {
  var data = message.id;
  data = data << 4;
  switch (message.command) {
    case "ack":
      break;
    case "startup":
      data += 1;
      break;
    case "shutdown":
      data += 2;
      break;
    case "destroy":
      data += 12;
      break;
    default:
      data += 8; // 8 is speical
      break;
  }
  return data;
};
EncodeDecorator.prototype.decode = function(data) {
  var message = {};
  message.id = data >> 4;
  var cmd = data & 0xf;
  switch(cmd) {
    case 0:
      message.command = "ack";
      break;
    case 1:
      message.command = "startup";
      break;
    case 2:
      message.command = "shutdown";
      break;
    case 12:
      message.command = "destroy";
      break;
    default:
      message.command = "unknown";
      break;
  }
  return message;
};
EncodeDecorator.prototype.send = function(target, message) {
  this.notifySystem.send(target, this.encode(message));
};
EncodeDecorator.prototype.receive = function(sender, message) {
  this.notifySystem.receive(sender, this.decode(message));
}
