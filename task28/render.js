var Render = (function() {
  var $ = function (el) { return document.querySelector(el); };
  var renderCount = 0;

  var shouldRenderShip = function() {
    return true; // always, but cause to performance problem
  };

  var shouldRenderController = function() {
    return renderCount % 5 == 0; // difficult to diff, temporarily remove
  };

  var renderShips = function() {
    var shipDom = $('#ships');
    var content = '';
    var count = 0;
    ShipFactory.getShips().forEach(function(ship) {
      if (ship.state == -1) return;
      content += "<div style='transform:rotate(" + ship.position + "deg);transform-origin:50% " +
        (55 + count * 40) + "px;'>" + ship.id.toString() +
        "(" + Math.round(ship.power) + "%)</div>";
      count++;
    });
    shipDom.innerHTML = content;
  };

  var renderController = function() {
    var ships = DC.getData();
    var controllerDom = $('#ship-controller');
    var content = '';
    Object.keys(ships).forEach(function(id) {
      content += "<div>对" + id + "号飞船下达指令：";
      content += "<button onclick='javascript:HeadQuarter.startupShip(" + id + ")'" + (ships[id].state == 1 ? " disabled='disabled'" : "") + ">开始飞行</button>";
      content += "<button onclick='javascript:HeadQuarter.shutdownShip(" + id + ")'" + (ships[id].state == 0 ? " disabled='disabled'" : "") + ">停止飞行</button>";
      content += "<button onclick='javascript:HeadQuarter.destroyShip(" + id + ")'" + (ships[id].state == -1 ? " disabled='disabled'" : "") + ">销毁</button>";
      content += "</div>";
    });
    controllerDom.innerHTML = content;
  };

  var renderShipState = function() {
    var data = DC.getData();
    var content = "<table border='1'><tr><td>飞船</td><td>动力系统</td><td>能源系统</td><td>当前飞行状态</td><td>剩余能耗</td><td>记录时间</td></tr>";
    Object.keys(data).forEach(function(id) {
      var ship = data[id];
      content += "<tr><td>" + ship.id + "号</td><td>" + ship.powerSystem + "</td><td>" + ship.supplySystem + "</td><td>" +
        (ship.state == 1 ? "飞行中" : (ship.state == 0 ? "停止中" : "即将销毁")) + "</td><td>" + ship.power + "%</td><td>" + ship.time + "</td></tr>";
    });
    content += "</table>";
    $('#screen').innerHTML = content;
  };

  var render = {
    render: function() {
      if (shouldRenderShip()) {
        renderShips();
      }
      if (shouldRenderController()) {
        renderController();
      }
      renderShipState();
      renderCount++;
    },
    toString: function() {
      return "Render";
    }
  };
  render.init = function() {
    $('#create-btn').onclick = function() {
      var ps = $('input[type=radio][name=ps]:checked');
      var ss = $('input[type=radio][name=ss]:checked');
      if (ps == null || ss == null) {
        Logger.error('invalid parameter', HeadQuarter);
        return;
      }
      HeadQuarter.createShip(parseInt(ps.value), parseInt(ss.value));
    }

    setInterval(function() {
      render.render();
    }, 100);
  };
  return render;
})();

Render.init();
