

Target = function(destination, ssh){
  this.ssh_ = ssh;
  this.destination_ = destination;
};

Target.prototype.getSsh = function(){
  return this.ssh_;
};

Target.prototype.getDestination = function(){
  return this.destination_;
};

module.exports = {
  Target: Target,
  create: function(destination, ssh){
    return new Target(destination, ssh);
  }
}
