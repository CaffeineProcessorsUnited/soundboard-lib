/**
  CPU - util
  Dependency: core, util, socket, config
**/
(function() {
	var modulename = "player";
  var Module = (function(modulename) {
    function Module(options) {
      this.name = modulename;
      var defaults {
        timeupdateInterval = 500,
        container: '<div id="cpu"></div>'
      }
      if (!options["cpu"]) {
        console.log("Can't load module \"" + this.name + "\"! You need to pass the cpu object.");
        return;
      }
      this.cpu = options["cpu"];
      options = this.cpu.extend(defaults, options || {});
      this.player
      this.timeupdate;
      this.timeupdateInterval = options.container;
      this.container = $(options.container);
      this.service;
      this.path;
      this.playing;
      this.duration,
      this.time;
      this.oldtrackinfo;
    };
    Module.prototype.setUpdateTime = function() {
      this.timeupdate = setInterval(function() {
        time = -1;
        switch (this.service) {
          case "youtube":
            if (this.player) {
              time = this.player.getCurrentTime();
            }
            break;
          case "filesystem":
          case "url":
          case "soundcloud":
          case "tts":
            elems = this.container.find('audio');
            if (elems.length) {
              time = elems[0].currentTime;
            }
            break;
        }
        if (time >= 0 && this.playing) {
          this.cpu.module("socket").emit('setPlaybackTime', {'time': time});
        }
      }, this.timeupdateInterval);
    };
    Module.prototype.createAudioElement = function(attributes, events) {
      var defaults = {
        controls: "true"
        loop: "false"
      };
      attributes = this.cpu.extend(defaults, attributes || {});
      events = events || {};
      player = $('<audio></audio>');
      for (var k in events) {
        if (events.hasOwnProperty(k)) {
          player.on(k, events[k]);
        }
      }
      for (var k in attributes) {
        if (attributes.hasOwnProperty(k)) {
          player.attr(k, attributes[k]);
        }
      }
      player[0].load();
      return player;
    };
    Module.prototype.createYouTubePlayer = function() {
      this.player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: this.path,
        events: {
          'onReady': function onPlayerReady(event) {
            event.target.setPlaybackQuality('small');
            event.target.seekTo(this.time, true);
            this.cpu.module("socket").emit('setDuration', {'duration': event.target.getDuration()});

            if(this.playing == 1){
                event.target.playVideo();
            }
          },
          'onStateChange': function onPlayerStateChange(event) {
            this.cpu.module("util").log(event.data);
            if (event.data == YT.PlayerState.PLAYING) {
            } else if (event.data == YT.PlayerState.PAUSED){

            } else if (event.data == YT.PlayerState.ENDED){
              this.cpu.module("socket").emit('next');
            }
          },
          'onError': function onPlayerError(event) {
            this.cpu.module("socket").emit('next');
          }
        }
      });
      return true;
    }
    Module.prototype.validTrack = function(track) {
      valid = true;
      if (!this.cpu.module("config").get("services", this.service)) {
        this.cpu.module("config").log("the server doesnt support this service!");
        valid = false;
      }
      return valid;
    };
    Module.prototype.isSameTrack = function(track) {
      return this.cpu.module("util").objequal(track, this.oldtrackinfo);
    };
    Module.prototype.playTrack = function(trackinfo) {
      if (isSameTrack()) {
        this.cpu.module("util").log(trackinfo);
        cpu.module("util").log("same track! just continue...");
        return;
      }
      oldtrackinfo = trackinfo;
      track = trackinfo["currentTrack"];
      if (validTrack(track)) {
        this.playing = trackinfo["playing"];
        this.service = track["service"];
        this.path = track["path"];
        this.time = trackinfo["time"]; // TODO: Change to track["time"] after changing server to use per-track position
        this.duration = track["duration"];
        if (this.cpu.module("config").get("services", this.service, "name")) {
          this.container.html('<p>' + this.cpu.module("config").get("services", this.service, "name") + '</p>');
        } else {
          this.container.html('<p>' + this.service + '</p>');
        }
        // Adjust paths and create options
        var attributes = {
          controls: "true"
        };
        switch (this.service) {
          case "youtube":
            // no need to adjust something for youtube
            break;
          case "filesystem":
          case "url":
            if (!!this.cpu.module("config").get("services", this.service, "prefix") {
              this.path = this.cpu.module("config").get("services", this.service, "prefix") + this.path;
              this.cpu.module("util").log(this.path);
            }
            break;
          case "soundcloud":
            if (!this.cpu.module("config").get("services", this.service, "apikey")) {
              this.cpu.module("util").log("you need to specify a soundcloud apikey in the server settings!");
              this.cpu.module("socket").emit("next");
              return;
            }
            scapikey = this.cpu.module("config").get("services", this.service, "apikey");
            url = window.location.protocol + '//api.soundcloud.com/resolve?format=json&consumer_key=' + scapikey + '&url=' + encodeURIComponent(this.path);
            success = false;
            $.ajax({
              url: url,
              async: false
            }).done(function(data) {
              if (!!data["stream_url"] && !!data["streamable"]) {
                attributes["src"] = data["stream_url"] + (/\?/.test(data["stream_url"]) ? '&' : '?') + 'consumer_key=' + scapikey;
                success = true;
              } else {
                this.cpu.module("socket").emit("next");
              }
            }).fail(function() {
              this.cpu.module("socket").emit("next");
            });
            if (!success) {
              return;
            }
            break;
          case "tts":
            var language = "de";
            if (this.cpu.module("config").get("services", this.service, "language")) {
              language = this.cpu.module("config").get("services", this.service, "language");
            }
            finished = false;
            meSpeak.loadVoice("/assets/voices/" + language + ".json", function() {
              attributes["src"] = meSpeak.speak(this.path, {'rawdata': "mime"});
              finished = true;
            });
            // TODO: Async // sync synchronisation xD
            break;
        }
        // TODO: Maybe outsource to seperate files
        switch (this.service) {
          case "youtube":
            this.container.append('<div id="player"></div>');
            createYouTubePlayer();
            break;
          case "filesystem":
          case "url":
          case "soundcloud":
          case "tts":
            this.container.append(createAudioElement(
              { src: this.path },
              {
                ended: function(event) {
                  this.cpu.module("socket").emit("next");
                },
                canplay: function(event) {
                  this.cpu.module("socket").emit('setDuration', {'duration': player[0].duration});
                  if (this.playing == true) {
                    event.target.play();
                  }
                },
                loadedmetadata: function(event) {
                  event.target.currentTime = this.time;
                }
              }

            }));
            break;
        }
      } else if (track === undefined) {
        // TODO: Change to use createAudioElement()
        this.cpu.module("util").log(track);
        this.container.html('<p>No tracks in queue</p>');


        player.addEventListener("canplay",function onCanPlay() {
          player.play();
        });
        this.container.append(createAudioElement(
          { src: 'songs/default.mp3', loop: "true" },

        ));
      } else {
        socket.emit("next");
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
