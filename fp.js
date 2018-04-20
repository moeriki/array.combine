const baseCombine = require('./combine');

// exports

exports.combine = arrays => baseCombine(arrays);

exports.combineWith = (iteratee, arrays) =>
  (arrays === undefined
    ? curriedArrays => baseCombine(curriedArrays, iteratee)
    : baseCombine(arrays, iteratee));
