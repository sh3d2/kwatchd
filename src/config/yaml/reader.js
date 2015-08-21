var yaml = require('js-yaml');
var fs   = require('fs');
var config = require('../config.js');

var Reader = function(file){
  var file_ = file;

}

Reader.prototype.read = function(){
  try{
    var data = yaml.safeLoad(fs.readFileSync('/etc/gwatchd/config.yml', 'utf8'));
  } catch (e) {
    console.log('error reading config file.');
  }

  return new config.Config(data);
}

module.exports = {
  Reader: Reader
};
// console.log(module);
