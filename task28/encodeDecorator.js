var EncodeDecorator = function(notifySystem) {
  this.notifySystem = notifySystem;
  this.host = notifySystem.host;
};
EncodeDecorator.prototype.encode = function(message) {
  var data = message.id;
  data = data << 4;
  if (message.command != null) { // hq command
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
  } else { // ship report
    switch (message.state) {
      case 0:
        data += 2;
        break;
      case 1:
        data += 1;
        break;
      case -1:
        data += 12;
        break;
    }
    data = data << 8;
    data += message.power;
  }
  return data;
};
EncodeDecorator.prototype.decode = function(data) {
  var message = {};
  if (data <= 0xff) { // hq command
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
  } else { // ship report
    message.id = data >> 12;
    var ship = data & 0xfff;
    message.power = ship & 0xff;
    var state = ship >> 8;
    switch(state) {
      case 1:
        message.state = 1;
        break;
      case 2:
        message.state = 0;
        break;
      case 12:
        message.state = -1;
        break;
      default:
        message.state = 0;
        break;
    }
  }
  return message;
};
EncodeDecorator.prototype.send = function(target, message) {
  this.notifySystem.send(target, this.encode(message));
};
EncodeDecorator.prototype.receive = function(sender, message) {
  this.notifySystem.receive(sender, this.decode(message));
}
