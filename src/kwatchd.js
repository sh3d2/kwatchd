var reader = require('./config/yaml/reader.js'),
  _ = require('underscore'),
  observer = require('./fs/observer.js'),
  rsync = require('./rsync/rsync'),
  ymlReader = new reader.Reader('file')
  config = ymlReader.read(),
  observer = new observer.FileSystemObserver();

_.each(config.getDirs(), function(dir){
  observer.addDirectory(dir.getPath(), _.debounce(function(path, info){
    rsync.create(dir).exec();
  }, 600));
});
