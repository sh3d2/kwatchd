var Target = require('./target.js');

var Dir = function(path, settings){
  this.path_ = path;
  this.target_ = Target.create(settings.target.path, settings.ssh);
  this.excludes_ = settings.excludes || [];
  this.includes_ = settings.includes || [];

}

Dir.prototype.getPath = function(){
  return this.path_;
};

Dir.prototype.getTarget = function(){
  return this.target_;
}

Dir.prototype.getExcludes = function(){
  return this.excludes_;
}

Dir.prototype.getIncludes = function(){
  return this.includes_;
}

module.exports = {
  create: function(path, settings){
    return new Dir(path, settings);
  }
}
