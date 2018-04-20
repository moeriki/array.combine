// utils

const flatten = (arr1, arr2) => {
  arr1.push(...arr2);
  return arr1;
};

// exports

module.exports = function combine(arrays, iteratee) {
  if (!Array.isArray(arrays)) {
    throw new TypeError(`Array.combine: Expected arrays to be an array. Instead received "${arrays}".`);
  }
  if (iteratee !== undefined && typeof iteratee !== 'function') {
    throw new TypeError(`Array.combine: Expected iteratee to be a function. Instead received "${iteratee}".`);
  }
  if (arrays.length === 0) {
    return [];
  }
  const end = arrays.length - 1;
  return arrays.reduce((acc, item, index) => {
    const arr = Array.isArray(item) ? item : [item];
    if (arr.length === 0) {
      return acc;
    }
    if (acc.length === 0) {
      return arr.map(arrItem => [arrItem]);
    }
    return acc
      .map(accArr =>
        arr.map((arrItem) => {
          const items = [...accArr, arrItem];
          return iteratee && index === end ? iteratee(items) : items;
        }))
      .reduce(flatten);
  }, []);
};
