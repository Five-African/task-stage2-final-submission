var Logger = (function() {
  return {
    log: function(message, sender) {
      console.log("[" + (sender != null ? sender.toString() : "Unknown") + "](" + (new Date().toString()) + "): " + message);
    },
    warn: function(message, sender) {
      console.warn("[" + (sender != null ? sender.toString() : "Unknown") + "](" + (new Date().toString()) + "): %c" + message, "color:orange");
    },
    error: function(message, sender) {
      console.error("[" + (sender != null ? sender.toString() : "Unknown") + "](" + (new Date().toString()) + "): %c" + message, "color:white;background-color:red");
    }
  };
})();
