
var fsevents = require('fsevents');
var _ = require('underscore');
var logger = require('../utils/log.js');


var FileSystemObserver = function(){
  this.watchers_ = [];

};

FileSystemObserver.prototype.addDirectory = function(dir, callback){
  var watcher = fsevents(dir);
  var observer = this;

  watcher.on('change', function(path, info){
    callback(path, dir);
  });
  watcher.mydir = dir;
  watcher.start();
  this.watchers_.push(watcher);
};

FileSystemObserver.prototype.stopAll = function(){
  _.each(this.watchers_, function(watcher){    
    logger.log('stopping watcher for', watcher.mydir);
    watcher.stop();
  })
}


module.exports = {
  FileSystemObserver: FileSystemObserver
};
