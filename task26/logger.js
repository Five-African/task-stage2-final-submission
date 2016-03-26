var Logger = (function() {
  var consoleDom = document.querySelector('#console');

  return {
    log: function(message, sender) {
      console.log("[" + (sender != null ? sender.toString() : "Unknown") + "](" + (new Date().toString()) + "): " + message);
      consoleDom.value += message + "\n";
    },
    warn: function(message, sender) {
      console.warn("[" + (sender != null ? sender.toString() : "Unknown") + "](" + (new Date().toString()) + "): %c" + message, "color:orange");
      consoleDom.value += message + "\n";
    },
    error: function(message, sender) {
      console.error("[" + (sender != null ? sender.toString() : "Unknown") + "](" + (new Date().toString()) + "): %c" + message, "color:white;background-color:red");
      consoleDom.value += message + "\n";
    }
  };
})();
