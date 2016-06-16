/**
  CPU - socket
  Dependency: core, util
**/
(function() {
	var modulename = "socket";
  var module = (function(modulename) {
    function module(options) {
      this.name = modulename;
      if (!options) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass some options.");
        return;
      }
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
      this.socket;
    };
    module.prototype.init = function(io) {
      this.socket = io();
    };
    module.prototype.on = function(name, listener) {
      if (!this.socket) {
        this.cpu.module("util").log("Socket not loaded!");
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
