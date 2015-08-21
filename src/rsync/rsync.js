var Rsync = require('rsync');
var logger = require('../utils/log.js');


var Command = function(dir){
  this.rsync = new Rsync()
      .shell('ssh -p '+dir.getTarget().getSsh().getPort())
      .flags('az')
      .source(dir.getPath())
      .destination(dir.getTarget().getSsh().getUser()
          + '@'
          + dir.getTarget().getSsh().getHost()
          + ':'
          + dir.getTarget().getDestination()
      );

};

Command.prototype.exec = function(){
  this.rsync.execute(function(error, code, cmd){
      if(code === 0){
        logger.log('sync complete.');
      } else {
        logger.log(error, cmd);
      }

  });
}





module.exports = {
  Command: Command,
  create: function(dir){
    return new Command(dir);
  }
};
