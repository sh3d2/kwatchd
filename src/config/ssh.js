


var Ssh = function(settings){

  this.host_ = '';
  this.port_ = '';
  this.user_ = '';

  this.extend(settings);
};

Ssh.prototype.setHost = function(host){
  this.host_ = host;

  return this;
};

Ssh.prototype.setPort = function(port){
  this.port_ = port;

  return this;
};

Ssh.prototype.setUser = function(user){
  this.user_ = user;

  return this;
};

Ssh.prototype.getHost = function(){
  return this.host_;
};

Ssh.prototype.getPort = function(){
  return this.port_;
}

Ssh.prototype.getUser = function(){
  return this.user_;
}

Ssh.prototype.extend = function(settings){
  if(settings.host){
    this.host_ = settings.host;
  }
  if(settings.port){
    this.port_ = settings.port;
  }
  if(settings.user){
    this.user_ = settings.user;
  }
}


module.exports = {
  Ssh: Ssh,
  create: function(settings){
    return new Ssh(settings);
  }
}
