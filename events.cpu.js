/**
  CPU - events
  Dependency: core, socket
**/
(function() {
	var modulename = "events";
  var module = (function(modulename) {
    function module(options) {
      this.name = modulename;
      this.events = {};
      this.trigger("init");
      $(document).ready(function() {
        this.trigger("ready");
      });
    };
    module.prototype.addEventListener = function(name, listener, onRegister) {
      if (!events[name]) {
        events[name] = [];
      }
      events[name].push(listener);
      if (onRegister && typeof onRegister === "function") {
        onRegister(cpu);
      }
    };
    module.prototype.trigger = function(name, data) {
      if (!events[name]) {
        events[name] = [];
      }
      for (var i = 0; i < events[name].length; i++) {
        events[name][i](cpu, data);
      }
    };
    return module;
  })(modulename);

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = module;
  } else {
    if (!window.cpumodules) {
      window.cpumodules = {};
    }
    window.cpumodules[modulename] = module;
  }
})();
