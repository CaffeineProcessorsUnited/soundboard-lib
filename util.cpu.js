/**
  CPU - util
  Dependency: core, socket
**/
(function() {
	var modulename = "util";
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
      this.utils = options["utils"] || window.utils || undefined;
      if (this.utils === undefined) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the utils object.");
        return;
      }
    };
    Module.prototype.log = function() {
      var message = window.util.format.apply(null, arguments);
      this.cpu.module("socket").emit("log", { 'log': message });
      console.log(message);
    };
    Module.prototype.objequal = function(a, b) {
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
