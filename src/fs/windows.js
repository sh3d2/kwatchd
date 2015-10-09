
var fsmonitor = require('fsmonitor');
var _ = require('underscore');
var logger = require('../utils/log.js');


var FileSystemObserver = function(){
  this.watchers_ = [];

};

FileSystemObserver.prototype.addDirectory = function(dir, callback){
  var watcher = fsmonitor.watch(dir);
  var observer = this;


  watcher.on('change', function(){
    callback();
  });

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
