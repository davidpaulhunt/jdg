var is = require('./helpers/is');
var get = require('./helpers/get');

var judge = module.exports = {};

judge.isInArray = function(array, target, sortable){
  if (is.missing(sortable)) {
    sortable = true;
  }

  var found = false;

  if (sortable) {
    array = judge.sortArray(array);
    if (is.array(target)) {
      target = judge.sortArray(target);
    }
  }

  var i = 0;
  while (found == false && i < array.length) {
    var a = array[i];
    if (is.object(target)) {
      found = judge.objectsAreAlike(a, target);
    } else if (is.array(target)) {
      found = judge.arraysAreAlike(a, target);
    } else if (a == target) {
      found = true;
    }
    i++;
  }

  return found;
};

judge.isInObject = function(object, target, arraysAreSortable) {
  if (!is.object(object)) {
    return false;
  }

  if (is.missing(arraysAreSortable)) {
    arraysAreSortable = true;
  }

  var found = false;

  for (var key in object) {
    if (found == true) { break; }
    if (is.undefined(key)) { continue; }

    if (is.object(target)) {
      found = judge.objectsAreAlike(object[key], target);
    } else if (is.array(target)) {
      found = judge.arraysAreAlike(object[key], target, arraysAreSortable);
    } else {
      found = object[key] === target;
    }
  }

  return found;
};

judge.sortArray = function(array){
  var byType = {};
  var typeKeys = [];
  var results = [];

  array.forEach(function(a, i) {
    var type = Object.prototype.toString.call(a);

    if (is.missing(byType[type])) {
      byType[type] = [];
    }

    var temp = {index: i};

    if (is.object(a)) {
      temp.value = get.keys(a).length;
    } else if (is.number(a)) {
      temp.value = a;
    } else {
      try {
        temp.value = a.length;
      } catch (e) {
        temp.value = 0;
      }
    }

    byType[type].push(temp);

    if (!judge.isInArray(typeKeys, type)) {
      typeKeys.push(type);
    }
  });

  typeKeys.sort();

  typeKeys.forEach(function(key) {
    byType[key].sort(function(a, b) {
      if (a.value > b.value) {
        return 1;
      } else if (a.value < b.value) {
        return -1;
      } else {
        return 0;
      }
    });

    byType[key].forEach(function(value) {
      results.push(array[value.index]);
    });
  });

  return results;
};

judge.objectsAreAlike = function(object, keys) {
  if (!is.object(object)) {
    return false;
  }

  var isAlike = true;

  for (var key in keys) {
    if (isAlike == false) { break; }
    if (is.missing(key)) { continue; }
    if (is.missing(object[key])) { isAlike = false; break; }

    if (is.object(keys[key])) {
      isAlike = judge.objectsAreAlike(object[key], keys[key]);
    } else if (is.array(keys[key])) {
      isAlike = judge.arraysAreAlike(object[key], keys[key]);
    } else if (object[key] != keys[key]) {
      isAlike = false;
      break;
    }
  }

  return isAlike;
};

judge.arraysAreAlike = function(array, target, sortable) {
  if (!is.array(array) || !is.array(target)) {
    return false;
  }

  if (is.missing(sortable)) {
    sortable = true;
  }

  if (sortable) {
    array = judge.sortArray(array);
    target = judge.sortArray(target);
  }

  var isAlike = true;

  var i = 0;
  while (isAlike == true && i < target.length) {
    isAlike = judge.isInArray(array, target[i]);
    i++;
  }

  return isAlike;
};

judge.is = is;
judge.get = get;
