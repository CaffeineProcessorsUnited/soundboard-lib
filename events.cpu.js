/**
  CPU - events
  Dependency: core, socket
**/
(function() {
	var modulename = "events";
  var Module = (function(modulename) {
    function Module(options) {
      this.name = modulename;
      this.events = {};
      this.trigger("init");
			self = this;
      $(document).ready(function() {
        self.trigger("ready");
      });
    };
    Module.prototype.addEventListener = function(name, listener, onRegister) {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(listener);
      if (onRegister && typeof onRegister === "function") {
        onRegister(cpu);
      }
    };
    Module.prototype.trigger = function(name, data) {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      for (var i = 0; i < this.events[name].length; i++) {
        this.events[name][i](cpu, data);
      }
    };
    return Module;
  })(modulename);

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Module;
  } else {
    if (!window.cpumodules) {
      window.cpumodules = {};
    }
    window.cpumodules[modulename] = Module;
  }
})();
