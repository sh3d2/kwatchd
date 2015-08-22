var Rsync = require('rsync');
var logger = require('../utils/log.js');
var ProgressBar = require('progress');



var Command = function(dir){
  this.rsync = new Rsync()
      .shell('ssh -p '+dir.getTarget().getSsh().getPort())
      .flags('a')
      // .set('progress')
      .set('info', 'progress2')
      // .set('stats')
      .source(dir.getPath())
      .destination(dir.getTarget().getSsh().getUser()
          + '@'
          + dir.getTarget().getSsh().getHost()
          + ':'
          + dir.getTarget().getDestination()
      );

};

Command.prototype.exec = function(){
  var total, remain,
      regexp = /to-chk=(\d+)/,
      progress;

  // logger.log('executing', this.rsync.command());
  this.rsync.output(function(data){
    var result = data.toString().match(regexp);
    if(!total && result && result[1]){
      total = parseInt(result[1]);
      progress = new ProgressBar('syncing [:bar] :percent :etas', {
        total: total,
        complete: '=',
        width: 20,
        callback: function(){console.log('\n')}
      });
    }
    if(total && result && result[1]){
        remain = parseInt(result[1]);
        progress.tick(total - remain);
        total = remain;

    } else {
      // console.log(data.toString());
    }
  });
  this.rsync.execute(function(error, code, cmd){
      total = null;
      remain = null;
      if(code === 0){
        setTimeout(function(){
            logger.log('sync complete.');
        }, 10);
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
