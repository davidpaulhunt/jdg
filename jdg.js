var is = require('./helpers/is');
var get = require('./helpers/get');

var jdg = module.exports = {};

jdg.isInArray = function(array, target, sortable){
  if (is.missing(sortable)) {
    sortable = true;
  }

  var found = false;

  if (sortable) {
    array = jdg.sortArray(array);
    if (is.array(target)) {
      target = jdg.sortArray(target);
    }
  }

  var i = 0;
  while (found == false && i < array.length) {
    var a = array[i];
    if (is.object(target)) {
      found = jdg.objectsAreAlike(a, target);
    } else if (is.array(target)) {
      found = jdg.arraysAreAlike(a, target);
    } else if (a == target) {
      found = true;
    }
    i++;
  }

  return found;
};

jdg.hasKey = function(object, key, arraysAreSortable) {
  if (!is.object(object) || is.missing(key) || !is.string(key)) {
    return false;
  }

  if (is.missing(arraysAreSortable)) {
    arraysAreSortable = true;
  }

  return jdg.isInArray(get.keys(object), key, arraysAreSortable);
}

jdg.hasKeys = function(object, keys, arraysAreSortable, exact) {
  if (!is.object(object) || !is.array(keys) || is.empty(keys)) {
    return false;
  }

  if (is.missing(arraysAreSortable)) {
    arraysAreSortable = true;
  }

  if (is.missing(exact)) {
    exact = false;
  }

  var found = 0;
  for (var i = 0; i < keys.length; i++) {
    if (jdg.hasKey(object, keys[i], arraysAreSortable)) {
      found++;
    } else {
      break;
    }
  }

  if (exact) {
    return found == get.keys(object).length;
  }

  return found == keys.length;
}

jdg.hasValue = function(object, value, arraysAreSortable) {
  if (!is.object(object) || is.missing(value)) {
    return false;
  }

  if (is.missing(arraysAreSortable)) {
    arraysAreSortable = true;
  }

  var hasValue = false;
  for (var key in object) {
    if (is.object(value)) {
      hasValue = jdg.objectsAreAlike(object[key], value);
    } else if (is.array(value)) {
      hasValue = jdg.arraysAreAlike(object[key], value, arraysAreSortable);
    } else {
      hasValue = (object[key] == value);
    }
  }

  return hasValue;
}

jdg.sortArray = function(array){
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

    if (!jdg.isInArray(typeKeys, type)) {
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

jdg.objectsAreAlike = function(object, keys) {
  if (!is.object(object)) {
    return false;
  }

  var isAlike = true;

  for (var key in keys) {
    if (isAlike == false) { break; }
    if (is.missing(key)) { continue; }
    if (is.missing(object[key])) { isAlike = false; break; }

    if (is.object(keys[key])) {
      isAlike = jdg.objectsAreAlike(object[key], keys[key]);
    } else if (is.array(keys[key])) {
      isAlike = jdg.arraysAreAlike(object[key], keys[key]);
    } else if (object[key] != keys[key]) {
      isAlike = false;
      break;
    }
  }

  return isAlike;
};

jdg.arraysAreAlike = function(array, target, sortable) {
  if (!is.array(array) || !is.array(target)) {
    return false;
  }

  if (is.missing(sortable)) {
    sortable = true;
  }

  var isAlike = true;

  if (sortable) {
    array = jdg.sortArray(array);
    target = jdg.sortArray(target);

    var i = 0;
    while (isAlike == true && i < target.length) {
      isAlike = jdg.isInArray(array, target[i]);
      i++;
    }
  } else {
    for (var i = 0; i < array.length; i++) {
      if (!isAlike) {
        break;
      }
      isAlike = (array[i] == target[i]);
    }
  }

  return isAlike;
};

jdg.is = is;
jdg.get = get;
