<p align="center">
  <h3 align="center">array.combine</h3>
  <p align="center">A JavaScript utility to combine arrays.<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/array.combine">
      <img src="https://img.shields.io/npm/v/mappr.svg" alt="npm version">
    </a>
    <a href="https://travis-ci.org/Moeriki/array.combine">
      <img src="https://travis-ci.org/Moeriki/array.combine.svg?branch=master" alt="Build Status"></img>
    </a>
    <a href="https://coveralls.io/github/Moeriki/array.combine?branch=master">
      <img src="https://coveralls.io/repos/github/Moeriki/array.combine/badge.svg?branch=master" alt="Coverage Status"></img>
    </a>
    <a href="https://david-dm.org/moeriki/array.combine">
      <img src="https://david-dm.org/moeriki/array.combine/status.svg" alt="dependencies Status"></img>
    </a>
    <a href="https://snyk.io/test/github/moeriki/array.combine">
      <img src="https://snyk.io/test/github/moeriki/array.combine/badge.svg" alt="Known Vulnerabilities"></img>
    </a>
  </p>
</p>

---

Use this if you want to combine multiple arrays to create a new array where each element from each array is combined with each element in each other array.

## Quick start

```
npm install --save array.combine
```

```js
const { combine } = require('array.combine');
combine([1, 2], [3, 4]); // => [1, 3], [1, 4], [2, 3], [2, 4]
```

## Combine

```js
const { combine, combineWith } = require('array.combine');
```

### API

#### `combine(arr1:Array<*>, [arrN:Array<*>]) :Array<*>`

```js
combine([1, 2], [3, 4]); // => [1, 3], [1, 4], [2, 3], [2, 4]
```

#### `combineWith(arr1:Array<*>, [...arrN:Array<*>], iteratee:function) :Array<*>`

```js
const add = (n1, n2) => n1 + n2;
combineWith([1, 2], [3, 4], add); // => [4, 5, 5, 6]
```

`add` is invoked with `(item1:*, [itemN:*])`.

In this example it would be `(1, 3)`, `(1, 4)`, etc…

## Combine/FP

```js
const { combine, combineWith } = require('array.combine/fp');
```

### API

#### `combine(arrays:Array<Array<*>>) :Array<*>`

```js
combine([[1, 2], [3, 4]]); // => [1, 3], [1, 4], [2, 3], [2, 4]
```

#### `combineWith(iteratee:function, arrays:Array<Array<*>) :Array<*>`

```js
const add = (n1, n2) => n1 + n2;
const addAll = (numbers) => numbers.reduce(add, 0);
combineWith(addAll, [[1, 2], [3, 4]]); // => [4, 5, 5, 6]
```

`addAll` is invoked with `(Array<*>)`.

In this example it would be `([1, 3])`, `([1, 4])`, etc…
