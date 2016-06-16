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
      if (!options["io"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the io object.");
        return;
      }
			this.io = options["io"]
      this.socket = this.io();
    };
    module.prototype.on = function(name, listeners) {
      if (!this.socket) {
        this.cpu.module("util").log("Socket not loaded!");
				return;
      }
			name = name.trim();
			listeners = listeners || {};
			if (listeners["onemit"]) {
				this.cpu.module("events").addEventListener("socket.emit." + name, listeners["onemit"]);
			}
			if (listeners["onreceive"]) {
				this.cpu.module("events").addEventListener("socket.receive." + name, listeners["onreceive"], function() {
					this.socket.on(name, function(data) {
						this.cpu.module("events").trigger("socket.receive." + name, data);
					});
				});
			}
    };
    module.prototype.emit = function(name, data) {
      if (!this.socket) {
        this.cpu.module("util").log("Socket not loaded!");
				return;
      }
			name = name.trim();
			data = data || {};
			this.cpu.module("events").trigger("socket.emit." + name, data);
			this.socket.emit(name, data);
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
