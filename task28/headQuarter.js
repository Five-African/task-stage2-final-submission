var HeadQuarter = (function() {
  var lastCommand = null; // there is no message left;
  var psType = ['前进号', '奔腾号', '超越号'];
  var ssType = ['劲量型', '光能型', '永久型'];

  var sendCommand = function(command, retryCount) {
    Object.keys(DC.getData()).forEach(function(shipId) {
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
      if (Object.keys(DC.getData()).length >= 4) {
        Logger.error('cannot create any more ships', headQuarter);
        return;
      }
      var shipId = ShipFactory.create(ps, ss);
      DC.addShip({
        id: shipId,
        powerSystem: psType[ps - 1],
        supplySystem: ssType[ss - 1]
      });
    },
    startupShip: function(id) {
      ship = DC.getData()[id];
      if (ship == null || ship.state == -1) {
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
      ship = DC.getData()[id];
      if (ship == null || ship.state == -1) {
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
      ship = DC.getData()[id];
      if (ship == null || ship.state == -1) {
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
      } else {
        headQuarter.notifySystem.send(-1, message);
      }
    },
    setState: function(cmd) {
      switch(cmd.command) {
        /* DC will manage ship state better */
        /*case "startup":
          break;
        case "shutdown":
          break;*/
        case "destroy":
          setTimeout(function() {
            delete ships[cmd.id];
            DC.removeShip(cmd.id)
          }, 1000); // delay 1s
          break;
      }
    },
    toString: function() {
      return "HeadQuarter";
    }
  }
  headQuarter.notifySystem = new EncodeDecorator(new NotifySystem(headQuarter));
  return headQuarter;
})();

Mediator.registerHq(HeadQuarter.notifySystem);
