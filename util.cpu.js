/**
  CPU - util
  Dependency: core, socket
**/
(function() {
	var modulename = "util";
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
      this.utils = options["utils"] || window.utils || undefined;
      if (this.utils === undefined) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the utils object.");
        return;
      }
    };
    module.prototype.log = function() {
      var message = window.util.format.apply(null, arguments);
      this.cpu.module("socket").emit("log", { 'log': message });
      console.log(message);
    };
    module.prototype.objequal = function(a, b) {
      function equal(a, b) {
        if (typeof a === "object" && typeof b === "object") {
          for (var k in a) {
            if (a.hasOwnProperty(k)) {
              if (b.hasOwnProperty(k)) {
                if (!this.objequal(a[k], b[k])) {
                  return false;
                }
              } else {
                return false;
              }
            }
          }
        } else {
          if (a != b) {
            return false;
          }
        }
        return true;
      }
      return equal(a, b) && equal(b, a);
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
