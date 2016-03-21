/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = $('#aqi-city-input').value.trim();
  var aqi = $('#aqi-value-input').value.trim();

  if (city == "" || aqi == "" || /[^A-Za-z \u4e00-\u9fa5]/.test(city) || /\D/.test(aqi) || aqiData[city] != null) {
    alert('输入有误');
    return;
  }

  aqiData[city] = parseInt(aqi);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  $('#aqi-table').innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>" +
    Object.keys(aqiData)
      .map(function(d) { return "<tr><td>" + d + "</td><td>" + aqiData[d] + "</td><td><button>删除</button></td>"; })
      .join('');
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  if (!(e.target instanceof HTMLButtonElement)) return;
  var city = e.target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  Object.keys = null;
  if (!Object.keys) {
    Object.keys = function(obj) {
      var result = [], prop;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
      return result;
    }
  }
  window.$ = function (el) { return document.querySelector(el); };
  window.onload = function() {
    $('#add-btn').onclick = addBtnHandle;
    $('#aqi-table').onclick = delBtnHandle;
  };
}

init();
