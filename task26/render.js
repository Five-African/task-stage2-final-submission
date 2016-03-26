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
        (50 + count * 30) + "px;'>" + ship.id.toString() +
        "(" + Math.round(ship.power) + "%)</div>";
      count++;
    });
    shipDom.innerHTML = content;
  }

  var renderController = function() {
    var ships = HeadQuarter.getShips();
    var controllerDom = $('#ship-controller');
    var content = '';
    Object.keys(ships).forEach(function(id) {
      content += "<div>对" + id + "号飞船下达指令：";
      content += "<button onclick='javascript:HeadQuarter.startupShip(" + id + ")'" + (ships[id] == 1 ? " disabled='disabled'" : "") + ">开始飞行</button>";
      content += "<button onclick='javascript:HeadQuarter.shutdownShip(" + id + ")'" + (ships[id] == 0 ? " disabled='disabled'" : "") + ">停止飞行</button>";
      content += "<button onclick='javascript:HeadQuarter.destroyShip(" + id + ")'>销毁</button>";
      content += "</div>";
    });
    controllerDom.innerHTML = content;
  }

  var render = {
    render: function() {
      if (shouldRenderShip()) {
        renderShips();
      }
      if (shouldRenderController()) {
        renderController();
      }
      renderCount++;
    },
    toString: function() {
      return "Render";
    }
  };
  render.init = function() {
    $('#create-btn').onclick = function() {
      HeadQuarter.createShip();
    }

    setInterval(function() {
      render.render();
    }, 100);
  };
  return render;
})();

Render.init();
