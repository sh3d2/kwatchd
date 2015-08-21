
var fsevents = require('fsevents');
var _ = require('underscore');


var FileSystemObserver = function(){
  this.watchers_ = [];

  this.callback = _.noop;
};

//
// FileSystemObserver.prototype.setCallback = function(callback){
//   this.callback = callback;
//   return this;
// };


FileSystemObserver.prototype.addDirectory = function(dir, callback){
  var watcher = fsevents(dir);
  var observer = this;
  watcher.on('change', function(path, info){
    console.log(dir);
    callback(path, dir);    
  });
  watcher.start();
  this.watchers_.push(watcher);
};

module.exports = {
  FileSystemObserver: FileSystemObserver
};
