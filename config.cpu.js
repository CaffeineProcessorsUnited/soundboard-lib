/**
  CPU - config
  Dependency: core, socket
**/
(function() {
	var modulename = "config";
  var Module = (function(modulename) {
    function Module(options) {
      this.name = modulename;
			options = options || {};
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
      this.config = {};
    };
    Module.prototype.load = function(config) {
      this.config = config;
    };
    Module.prototype.get = function() {
      var c = this.config;
      for (var i = 0; i < arguments.length; i++) {
        if (c[arguments[i]]) {
          c = c[arguments[i]];
        } else {
          return undefined;
        }
      }
			return c;
    };
    Module.prototype.clear = function() {
      this.config = {};
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
