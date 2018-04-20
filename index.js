const baseCombine = require('./combine');

// utils

const spread = func => args => func(...args);
const unspread = func => (...args) => func(args);

// exports

exports.combine = unspread(baseCombine);

exports.combineWith = (...args) => {
  const [iteratee] = args.splice(args.length - 1);
  return baseCombine(
    args,
    typeof iteratee === 'function' ? spread(iteratee) : iteratee,
  );
};
