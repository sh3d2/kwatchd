
var fsevents = require('fsevents');
var _ = require('underscore');
var logger = require('../utils/log.js');


var FileSystemObserver = function(){
  this.watchers_ = [];

  this.callback = _.noop;
};

FileSystemObserver.prototype.addDirectory = function(dir, callback){
  var watcher = fsevents(dir);
  var observer = this;
  watcher.on('change', function(path, info){
    logger.log('observed changes in', dir);
    callback(path, dir);
  });
  watcher.start();
  this.watchers_.push(watcher);
};


module.exports = {
  FileSystemObserver: FileSystemObserver
};
