(function(Mason, env) {
  var curPos = [4, 4];
  var curDir = 0; // 0: 上, 1:右 , 2: 下, 3: 左
  var table = document.getElementById('chessboard');

  function getCell(x, y) {
    x += 2;
    y += 2;
    return table.querySelector("tr:nth-of-type(" + x + ") td:nth-of-type(" + y + ")");
  }

  getCell(curPos[0], curPos[1]).className = 'dir' + curDir;

  window.RUNTIME = {
    execute: function(code) {
      getCell(curPos[0], curPos[1]).className = '';
      if (code.trim() == "GO") { // 因为语句存在二义性，先hack掉了。请使用 GO + 任意参数
        window.RUNTIME.go();
      }
      else {
        try {
          Mason.Execute(code, env);
        } catch(e) {
          alert(e.message);
        }
      }
      getCell(curPos[0], curPos[1]).className = 'dir' + curDir;
    },
    turn: function(dir) {
      curDir = (curDir + dir + 4) % 4;
    },
    go: function() {
      switch (curDir) {
        case 0:
          curPos[0]--;
          break;
        case 1:
          curPos[1]++;
          break;
        case 2:
          curPos[0]++;
          break;
        case 3:
          curPos[1]--;
          break;
      }
      if (curPos[0] < 0) {
        curPos[0] = 0;
      }
      if (curPos[1] < 0) {
        curPos[1] = 0;
      }
      if (curPos[0] > 9) {
        curPos[0] = 9;
      }
      if (curPos[1] > 9) {
        curPos[1] = 9;
      }
    }
  }
})(window.Mason, window.ENV);
