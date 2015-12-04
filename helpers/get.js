var is = require('./is');

module.exports = {
  keys: function(obj){
    var keys = [];
    for (var key in obj) {
      if (is.present(key)) {
        keys.push(key);
      }
    }

    return keys;
  }
}
