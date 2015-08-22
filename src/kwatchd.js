var reader = require('./config/yaml/reader.js'),
  _ = require('underscore'),
  logger = require('./utils/log.js');
  observer = require('./fs/observer.js'),
  rsync = require('./rsync/rsync'),
  ymlReader = new reader.Reader('file')
  config = ymlReader.read(),
  observer;

  logger.log('Your platform is', process.platform);

  switch(process.platform){
    case 'darwin':
      observer = new observer.FileSystemObserver();
      logger.log('using fsevents');
      break;
    default:
      throw "unsupported platform";
  }

_.each(config.getDirs(), function(dir){
  observer.addDirectory(dir.getPath(), _.debounce(function(path, info){
    logger.log('observed changes in', dir.getPath());
    rsync.create(dir).exec();
  }, 600));
});

function shutdown(){
  logger.log('shutting down');
  observer.stopAll();
  process.exit();
}

process.on ('SIGTERM', shutdown);
process.on ('SIGINT', shutdown);
