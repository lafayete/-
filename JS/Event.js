//使用发布订阅模式实现事件系统的eventEmitter
function eventEmitter() {
  var self = this;
  self.events = {};

  self.trigger = function(eventName) {
    if (self.events[eventName] && self.events[eventName].length != 0) {
      self.events[eventName].forEach(fn => {
        fn();
      });
    }
  };

  self.on = function(eventName, callback) {
    if (self.events[eventName] == undefined) {
      self.events[eventName] = [];
    }
    if (self.events[eventName].indexOf(callback) == -1) {
      self.events[eventName].push(callback);
    }
  };

  self.off = function(eventName, callback) {
    if (callback == undefined) {
      self.events[eventName] = [];
    } else {
      var index = self.events[eventName].indexOf(callback);
      self.events[eventName].splice(index, index + 1);
    }
  };

  self.once = function(event, callback) {
    let wrapCallback = () => {
      callback();
      this.off(event, wrapCallback);
    };
    self.on(event, wrapCallback);
  };
}

var event = new eventEmitter();

function test1() {
  console.log("11111");
}

function test2() {
  console.log("22222");
}
event.once("start", test1);
event.on("start", test2);
event.trigger("start");
event.trigger("start");
