/**
  CPU - config
  Dependency: core, socket
**/
(function() {
	var modulename = "auth";
  var Module = (function(modulename) {
    function Module(options) {
      this.name = modulename;
			options = options || {};
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
      this.credentials = {};
      this.auth = {}
    };
		Module.prototype.loadCreds(creds) {
			this.credentials = creds;
		}
    Module.prototype.addClient = function (id) {
      if (!this.auth.hasOwnProperty(id)) {
        this.auth[id] = false;
      }
    };
    Module.prototype.login(id, username, passwd) {
			this.addClient(id);
			if (this.credentials.hasOwnProperty(username)) {
				if (this.credentials[username] == passwd) {
					this.auth[id] = true;
				}
			}
    };
		Module.prototype.logout(id) {
			if (this.auth.hasOwnProperty(id)) {
        this.auth[id] = false;
      }
		}
		Module.prototype.isLogin(id) {
			if (this.auth.hasOwnProperty(id)) {
        return this.auth[id];
      } else {
				return false;
			}
		}
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
