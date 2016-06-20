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
    module.prototype.genList = function(options) {
      options = options || {};
			options.list = options.list || [];
      options.genRow = options.genRow || function(item, options) {
        return $('<li></li>').text(this.cpu.module("util").format(item));
      };
      var list = $('<ul></ul>');
      options.list.forEach(function(item, index){
        list.append(options.genRow(index, item, options));
      });
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
