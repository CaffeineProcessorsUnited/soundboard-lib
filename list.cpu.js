/**
  CPU - list
  Dependency: core
**/
(function() {
	var modulename = "list";
  var module = (function(modulename) {
    function module(options) {
      this.name = modulename;
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
    }
    module.prototype.genList = function(data, options) {
      options = options || {};
      options.genRow = options.genRow || function(item) {
        return this.cpu.module("util").format(item);
      };
      var list = $('<ul></ul>');
      for (entry in data) {
        var elem = $('<li></li>');
        elem.addClass('item');
        elem.html(options.genRow(entry));
        list.append(elem);
      }
      return list;
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
