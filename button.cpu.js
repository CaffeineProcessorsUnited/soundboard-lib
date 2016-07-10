/**
  CPU - button
  Dependency: core
**/
(function() {
	var modulename = "button";
  var Module = (function(modulename) {
    function Module(options) {
      this.name = modulename;
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
    }
    Module.prototype.genButton = function(options) {
      options = options || {};
      options.attrs = options.attrs || {};

      var button = $('<a></a>');
      if (options.icon) {
        var icon = $('<i></i>');
        icon.addClass('fa');
        icon.addClass('fa-' + options.icon);
        button.append(icon);
      }
      if (options.text) {
        var text = $('<div></div>');
        text.text(options.text);
        button.append(text);
      }
      for (var k in options.attrs) {
        if (options.attrs.hasOwnProperty(k) && k != 0) {
          button.attr(k, options.attrs[k]);
        }
      }
      return button;
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
