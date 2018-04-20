/* eslint-env jest */

const { combine, combineWith } = require('./fp');

// utils

const add = (n1, n2) => n1 + n2;
const mergeAll = sources =>
  sources.reduce((acc, src) => Object.assign(acc, src), {});
const sum = numbers => numbers.reduce(add, 0);

// tests

describe('fp/combine', () => {
  it('should throw if arrays is no array', () => {
    expect(() => combine('string')).toThrowErrorMatchingSnapshot();
  });

  it('should combine multiple arrays', () => {
    expect(combine([[1, 2], [3, 4]])).toEqual([[1, 3], [1, 4], [2, 3], [2, 4]]);
    expect(combine([[0], [1, 2], [3, 4, 5]])).toEqual([
      [0, 1, 3],
      [0, 1, 4],
      [0, 1, 5],
      [0, 2, 3],
      [0, 2, 4],
      [0, 2, 5],
    ]);
  });

  it('should combine arrays with single item', () => {
    expect(combine(['test', [1, 2]])).toEqual([['test', 1], ['test', 2]]);
  });

  it('should handle empty arrays in between', () => {
    expect(combine([[1, 2], [], [3, 4]])).toEqual([
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
    ]);
  });

  it('should return new array on empty array', () => {
    const arr = [];
    expect(combine([arr])).not.toBe(arr);
  });

  it('should "combine" stupid input sensibly', () => {
    expect(combine([])).toEqual([]);
    expect(combine([[]])).toEqual([]);
    expect(combine([[], []])).toEqual([]);
    expect(combine([1])).toEqual([[1]]);
    expect(combine([[1]])).toEqual([[1]]);
    expect(combine([null])).toEqual([[null]]);
    expect(combine([[null]])).toEqual([[null]]);
    expect(combine([undefined])).toEqual([[undefined]]);
    expect(combine([[undefined]])).toEqual([[undefined]]);
  });
});

describe('fp/combineWith', () => {
  it('should throw if iteratee is not a function', () => {
    expect(() => combineWith([], 'string')).toThrowErrorMatchingSnapshot();
  });

  it('should combine with iteratee', () => {
    expect(combineWith(sum, [[1, 2], [3, 4]])).toEqual([
      4, // = sum(1, 3),
      5, // = sum(1, 3),
      5, // = sum(1, 4),
      6, // = sum(1, 4),
    ]);
    expect(combineWith(mergeAll, [[{ x: 1 }, { x: 2 }], [{ y: 1 }, { y: 2 }]]),
    ).toEqual([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }]); // eslint-disable-line
  });

  it('should curry with iteratee', () => {
    expect(combineWith(sum)([[1, 2], [3, 4]])).toEqual([
      4, // = sum(1, 3),
      5, // = sum(1, 3),
      5, // = sum(1, 4),
      6, // = sum(1, 4),
    ]);
    expect(combineWith(mergeAll, [[{ x: 1 }, { x: 2 }], [{ y: 1 }, { y: 2 }]]),
    ).toEqual([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 2 }]); // eslint-disable-line
  });
});
