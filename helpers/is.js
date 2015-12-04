module.exports = {
  present: function(obj){
    return (typeof obj != 'undefined' && obj != null);
  },

  missing: function(obj){
    return this.present(obj) == false;
  },

  object: function(obj){
    return Object.prototype.toString.call(obj) == '[object Object]';
  },

  array: function(array){
    return Array.isArray(array);
  },

  number: function(num){
    return (typeof num == 'number') || (Object.prototype.toString.call(num) == '[object Number]');
  }
}
