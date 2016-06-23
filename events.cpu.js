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
			self = this;
      $(document).ready(function() {
        self.trigger("ready");
      });
    };
    module.prototype.addEventListener = function(name, listener, onRegister) {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(listener);
      if (onRegister && typeof onRegister === "function") {
        onRegister(cpu);
      }
    };
    module.prototype.trigger = function(name, data) {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      for (var i = 0; i < this.events[name].length; i++) {
        this.events[name][i](cpu, data);
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
