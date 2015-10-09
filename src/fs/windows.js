
var fsmonitor = require('fsmonitor');
var _ = require('underscore');
var logger = require('../utils/log.js');


var FileSystemObserver = function(){
  this.watchers_ = [];

};

FileSystemObserver.prototype.addDirectory = function(dir, callback){
  // var watcher = fsevents(dir);
  var observer = this;

var watcher = fsmonitor.watch(dir, null, function(info){
  callback();
})

console.log(watcher);

  // watcher.on('change', function(path, info){
  //   callback(path, dir);
  // });
  watcher.mydir = dir;
  this.watchers_.push(watcher);
};

FileSystemObserver.prototype.stopAll = function(){
  _.each(this.watchers_, function(watcher){
    logger.log('stopping watcher for', watcher.mydir);
    // watcher.stop();
  })
}


module.exports = {
  FileSystemObserver: FileSystemObserver
};
