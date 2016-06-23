(function() {
  var cpu = (function() {
    function cpu() {
      this.modules = {};
    };
    cpu.prototype.loadModule = function(name, options, force) {
      if (!name || !(typeof name === "object" || name != "")) {
        console.log("Can't load modules without a name");
        return;
      }
      if (!options || typeof options !== "object") {
        options = {};
      }
      options = this.extend(options, { cpu: this });
      if (!force) {
        force = false;
      }
      console.log(options);
      if (window.cpumodules && window.cpumodules[name]) {
        // we are in a browser
        if (!this.modules[name] || force) {
          this.modules[name] = new window.cpumodules[name](options);
        } else {
          console.log("The module \"" + name + "\" is already loaded! User 'force' to override the old one.");
        }
      } else if (typeof name === "object") {
        // we are in node.js
        var module = new name(options);
        if (!this.modules[module.name] || force) {
          this.modules[module.name] = module;
        } else {
          console.log("This module \"" + name + "\" is already loaded! User 'force' to override the old one.");
        }
      } else {
        console.log("Couldn't load module \"" + name + "\"");
      }
    };
    cpu.prototype.module = function(name) {
      return (this.modules[name]) ? this.modules[name] : undefined;
    };
    cpu.prototype.clone = function(o) {
      if (undefined == o || typeof o !== "object") {
        return o;
      }
      var copy = o.constructor();
      for (var k in o) {
        if (o.hasOwnProperty(k)) {
          copy[k] = o[k];
        }
      }
    };
    cpu.prototype.extend = function(o1, o2) {
      // extend object1 with object2
      var e = this.clone(o1);
      for (var k in e) {
          if (o2.hasOwnProperty(k)) {
             e[k] = o2[k];
          }
       }
       return e;
    };
    return cpu;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = cpu;
  } else {
    window.cpu = cpu;
    window.cpumodules = {};
  }
})();
