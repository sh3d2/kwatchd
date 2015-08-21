

var Dir = require('./dir.js');
var Ssh = require('./ssh.js');
var _ = require('underscore');

var Config = function(data){
  this.data_ = data;
  this.dirs_ = [];

  _.each(this.data_.dirs, function(config, path){
    var ssh = Ssh.create(_.extend(data.ssh, config.ssh));
    this.dirs_.push(Dir.create(path, _.extend(config, {
      ssh: ssh
    })));
  }, this);
};

Config.prototype.getData = function(){
  return this.data_;
};

Config.prototype.getDirs = function(){
  return this.dirs_;
}

module.exports = {
  Config: Config
}
