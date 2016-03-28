var HeadQuarter = (function() {
  var ships = {}; // save ship state, 0 for stop, 1 for run
  var lastCommand = null; // there is no message left;

  var sendCommand = function(command, retryCount) {
    Object.keys(ships).forEach(function(shipId) {
      headQuarter.notifySystem.send(shipId, command);
    });
    setTimeout(function() {
      if (lastCommand == null) return;
      if (retryCount == 0) {
        Logger.warn('can not find ship ' + lastCommand.id, headQuarter);
        headQuarter.setState(lastCommand);
        lastCommand = null;
        return;
      }

      Logger.warn('no feedback, send again', headQuarter);
      if (typeof retryCount == "number") {
        sendCommand(lastCommand, --retryCount);
      }
      else {
        sendCommand(lastCommand);
      }
    }, 700);
  }

  var headQuarter = {
    id: 0,
    createShip: function(ps, ss) {
      if (Object.keys(ships).length > 3) {
        Logger.error('cannot create any more ships', headQuarter);
        return;
      }
      var shipId = ShipFactory.create(ps, ss);
      ships[shipId] = 0;
    },
    startupShip: function(id) {
      if (ships[id] == null || ships[id] == -1) {
        Logger.error('ship ' + id + ' not found or has destroyed', headQuarter);
        return;
      }
      if (lastCommand != null) {
        Logger.error('system is in used, command can not be sent now', headQuarter);
        return;
      }
      var cmd = {
        id: id,
        command: 'startup'
      };
      lastCommand = cmd;
      sendCommand(cmd);
      Logger.log('startup ship ' + id.toString(), headQuarter);
    },
    shutdownShip: function(id) {
      if (ships[id] == null || ships[id] == -1) {
        Logger.error('ship ' + id + ' not found or has destroyed', headQuarter);
        return;
      }
      if (lastCommand != null) {
        Logger.error('system is in used, command can not be sent now', headQuarter);
        return;
      }
      var cmd = {
        id: id,
        command: 'shutdown'
      };
      lastCommand = cmd;
      sendCommand(cmd);
      Logger.log('shutdown ship ' + id.toString(), headQuarter);
    },
    destroyShip: function(id) {
      if (ships[id] == null || ships[id] == -1) {
        Logger.error('ship ' + id + ' not found or has destroyed', headQuarter);
        return;
      }
      if (lastCommand != null) {
        Logger.error('system is in used, command can not be sent now', headQuarter);
        return;
      }
      var cmd = {
        id: id,
        command: 'destroy'
      };
      lastCommand = cmd;
      sendCommand(cmd, 5);
      Logger.log('destroy ship ' + id.toString(), headQuarter);
    },
    dealMessage: function(message) {
      if (message.command == "ack") {
        Logger.log('ship ' + message.id.toString() + ' ack', headQuarter);

        headQuarter.setState(lastCommand);
        lastCommand = null;
      }
    },
    setState: function(cmd) {
      switch(cmd.command) {
        case "startup":
          ships[cmd.id] = 1;
          break;
        case "shutdown":
          ships[cmd.id] = 0;
          break;
        case "destroy":
          delete ships[cmd.id];
          break;
      }
    },
    getShips: function() {
      return ships;
    },
    toString: function() {
      return "HeadQuarter";
    }
  }
  headQuarter.notifySystem = new EncodeDecorator(new NotifySystem(headQuarter));
  return headQuarter;
})();

Mediator.registerHq(HeadQuarter.notifySystem);
