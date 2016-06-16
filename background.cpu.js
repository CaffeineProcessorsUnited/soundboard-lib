/**
  CPU - config
  Dependency: core, events
**/
(function() {
	var modulename = "background";
  var module = (function(modulename) {
    function module(options) {
      this.name = modulename;
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
      this.tasks = {};
    }
    module.prototype.addUpdateListener = function(listner) {
      this.cpu.module("events").addEventListener(this.name + ".update", listner);
    };

    module.prototype.set = function(name, state) {
      this.tasks[name] = state;
      this.cpu.module("events").trigger(this.name + ".update");
    };

    module.prototype.get = function(name) {
      if (name) {
        return this.tasks[name];
      }
      var working = false;
      for (var k in this.tasks) {
        if (this.tasks.hasOwnProperty(k)) {
          if (this.tasks[k] === true) {
            working = true;
            break;
          }
        }
      }
      return working;
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
