/**
  CPU - socket
  Dependency: core, util
**/
(function() {
	var modulename = "socket";
  var Module = (function(modulename) {
    function Module(options) {
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
			var defaults = {
				host : "localhost",
				port : "8080",
				protokoll : "http"
			}
			if(!options["server"]){
				options["server"] = false;
			}
			this.io = options["io"];
			if(!options["server"]) {
      	this.socket = this.io(defaults.protokoll + "://" + defaults.host + ":" + defaults.port);
			}
      this.names = [];
    };
    Module.prototype.registerSocket = function(socket, events){
    	var currentSocket = this.socket || socket;
			if (!currentSocket) {
        this.cpu.module("util").log("Socket not loaded!");
				return;
      }
    	var events = events || this.names;
    	for (var i = 0; i < events.length; i++) {
				var name = events[i];
	    	currentSocket.on(name, function(data) {
					cpu.module("events").trigger("socket.receive." + name, { socket: currentSocket, data: data });
				});
    	}
    }
    Module.prototype.on = function(name, listeners){
			name = name.trim();
			listeners = listeners || {};
			if (listeners["onemit"]) {
				this.cpu.module("events").addEventListener("socket.emit." + name, listeners["onemit"]);
			}
			if (listeners["onreceive"]) {
				this.names.push(name);
				this.cpu.module("events").addEventListener("socket.receive." + name, listeners["onreceive"]);
			}
    };
    Module.prototype.emit = function(name, data, socketID) {
			var currentSocket = this.socket || (socketID !== undefined)? this.io.to(socketID) : undefined;
      if (!currentSocket && !this.io.sockets) {
        this.cpu.module("util").log("Socket not loaded!");
				return;
      }
			name = name.trim();
			data = data || {};
			if(currentSocket === undefined)  {
				this.io.emit(name, data);
			} else {
				currentSocket.emit(name, data);
			}
			this.cpu.module("events").trigger("socket.emit." + name, { socket: currentSocket, data: data });
    };
    Module.prototype.trigger = function(name, data) {
      if (!events[name]) {
        events[name] = [];
      }
      for (var i = 0; i < events[name].length; i++) {
        events[name][i](cpu, data);
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
