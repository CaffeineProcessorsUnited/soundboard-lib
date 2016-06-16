/**
  CPU - config
  Dependency: core, socket
**/
(function() {
	var modulename = "config";
  var module = (function(modulename) {
    function module(options) {
      this.name = modulename;
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
      this.config = {};
      this.update();
    };
    module.prototype.load = function(config) {
      this.config = config;
    };
    module.prototype.get = function() {
      var c = this.config;
      for (var i = 0; i < arguments.length; i++) {
        if (c[arguments[i]]) {
          c = c[arguments[i]];
        } else {
          return undefined;
        }
      }
    };
    module.prototype.clear = function() {
      this.config = {};
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
