# Zip Iter

This library contains two very useful functions that really should be a part of the JS
standard library (says the python dev). The functions "zip" and "zip longest" have
numerous uses in many aspects of programming.

In this library, these functions can handle any kind of iterable (basically anything
that has a ``Symbol.iterator`` method).

Both functions are generators. To unpack the result easily, you can use the spread
operator (``[...zip(...iterables)]``) or ``Array.from(zip(...iterables))``.

## Install

With yarn:

```bash
$ yarn add zip-iter
```

Or with npm:

```bash
$ npm add zip-iter
```

## Example usage

Import:

```typescript
import { zip, zipLongest } from "zip-iter";
```

With arrays:

```typescript
const array1 = [1, 2, 3];
const array2 = ['a', 'b', 'c'];

const zipped = zip(array1, array2);
// outputs [1, 'a'], [2, 'b'], [3, 'c']
const zippedArray = Array.from(zipped);
// outputs [[1, 'a'], [2, 'b'], [3, 'c']]

// array1 and array2 have the same number of elements,
// so zipLongest won't do anything special here.
const zippedLongest = zipLongest(array1, array2);
// outputs [1, 'a'], [2, 'b'], [3, 'c']
const zippedLongestArray = [...zippedLongest];
// outputs [[1, 'a'], [2, 'b'], [3, 'c']]
```

With strings:

```typescript
const string1 = 'abcd';
const string2 = 'xyz';

const zipped = zip(string1, string2);
// outputs ['a', 'x'], ['b', 'y'], ['c', 'z']

const zippedLongest = zipLongest(string1, string2);
// outputs ['a', 'x'], ['b', 'y'], ['c', 'z'], ['d', undefined]
```

With iterable objects like ``Map`` and ``Set``:

```typescript
const myMap = new Map();
myMap.set('a', 1).set('b', 2);
const mySet = new Set();
mySet.add('x').add('y').add('z');

const zipped = zip(myMap, mySet);
// outputs [['a', 1], 'x'], [['b', 2], 'y']

const zippedLongest = zipLongest(myMap, mySet);
// outputs [['a', 1], 'x'], [['b', 2], 'y'], [undefined, 'z']
```

With iterators directly:

```typescript
const zipped = zip(myMap.entries(), mySet.entries());
// outputs [['a', 1], 'x'], [['b', 2], 'y']

const zippedLongest = zipLongest(myMap.entries(), mySet.entries());
// outputs [['a', 1], 'x'], [['b', 2], 'y'], [undefined, 'z']
```

Generators are iterators, so they work too:

```typescript
const genNumbers = function*(count: number): Generator<number> {
    for (let x = 0; x < count; x++) {
        yield x;
    }
};
const generator1 = genNumbers(3);
const generator2 = genNumbers(2);

const zipped = zip(generator1, generator2);
// outputs [0, 0], [1, 1]

// Generators can't be re-used
const zippedLongest = zipLongest(genNumbers(3), genNumbers(2));
// outputs [0, 0], [1, 1], [2, undefined]
```

Zips are generators, so they can be zipped too!

```typescript
const myStr = 'zzz';
const myArr = ['i', 'i', 'i'];
const myMap = new Map().set(0, 'p').set(1, 'p').set(2, 'p');

const zipped1 = zip(myStr, myArr, myMap.values());
const zipped2 = zip(myMap.values(), myArr, myStr);

const zipped3 = zip(zipped1, zipped2);
/**
 * outputs [
 *   [['z', 'i', 'p'], ['p', 'i', 'z']],
 *   [['z', 'i', 'p'], ['p', 'i', 'z']],
 *   [['z', 'i', 'p'], ['p', 'i', 'z']],
 * ]
 */
```
