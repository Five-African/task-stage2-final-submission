window.ENV = (function(Mason) {
  var env = new Mason.Environment();

  env.def("LEF", -1);
  env.def("RIG", 1);
  env.def("BAC", 2);
  // is GO a function or a variable?
  env.def("GO", function() {
    window.RUNTIME.go();
  });
  env.def("TUN", function(dir) {
    window.RUNTIME.turn(dir);
  });

  return env;
})(window.Mason);
