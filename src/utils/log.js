
var _ = require('underscore');

module.exports = {
  log: function(){
    var a = _.values(arguments);
    a.unshift(new Date().toString() + ' -- ');
    console.log.apply(this, a);
  }
};
