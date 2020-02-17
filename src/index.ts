export function zip<T1, T2>(iterable1: Iterable<T1>, iterable2: Iterable<T2>): Generator<[T1, T2]>;
export function zip<T1, T2, T3>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
): Generator<[T1, T2, T3]>;
export function zip<T1, T2, T3, T4>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
  iterable4: Iterable<T4>,
): Generator<[T1, T2, T3, T4]>;
export function zip<T1, T2, T3, T4, T5>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
  iterable4: Iterable<T4>,
  iterable5: Iterable<T5>,
): Generator<[T1, T2, T3, T4, T5]>;
export function zip<T1, T2, T3, T4, T5, T6>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
  iterable4: Iterable<T4>,
  iterable5: Iterable<T5>,
  iterable6: Iterable<T6>,
): Generator<[T1, T2, T3, T4, T5, T6]>;
/**
 * Creates a sequence of arrays the same length as the *shortest* iterable provided. The first array contains the first
 * element from each of the iterables provided. The second array contains the second element from each of the
 * iterables provided, and so on.
 *
 * This function was taken from here:
 * https://github.com/toolbuilder/iterablefu/blob/ea8faddc34848192668e502f02da0e859b343d11/src/generators.js#L140
 * The type declarations were adapted from the lodash zip() function.
 *
 * @param  {...Iterable} iterables the iterables to be zipped
 * @returns {Generator} for the zipped arrays
 * @example
 * const a = [0, 1, 2]
 * const b = ['a', 'b', 'c', 'd', 'e', 'f'] // note that this array is longer than a
 * const generator = zip(a, b)
 * console.log([...generator]) // prints [[0, 'a'], [1, 'b'], [2, 'c']]
 */
export function* zip<T>(...iterables: Array<Iterable<T>>): Generator<Array<T>> {
  const isDone = (nextResults: IteratorResult<T>[]): boolean => {
    return nextResults.reduce((done: boolean, nextResult): boolean => {
      return done || Boolean(nextResult.done);
    }, false);
  };
  const iterators = iterables.map(x => x[Symbol.iterator]());
  let nextResults = iterators.map(i => i.next());
  while (!isDone(nextResults)) {
    yield nextResults.map(result => result.value);
    nextResults = iterators.map(i => i.next());
  }
}

export function zipLongest<T1, T2>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
): Generator<[T1 | undefined, T2 | undefined]>;
export function zipLongest<T1, T2, T3>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
): Generator<[T1 | undefined, T2 | undefined, T3 | undefined]>;
export function zipLongest<T1, T2, T3, T4>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
  iterable4: Iterable<T4>,
): Generator<[T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined]>;
export function zipLongest<T1, T2, T3, T4, T5>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
  iterable4: Iterable<T4>,
  iterable5: Iterable<T5>,
): Generator<[T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined, T5 | undefined]>;
export function zipLongest<T1, T2, T3, T4, T5, T6>(
  iterable1: Iterable<T1>,
  iterable2: Iterable<T2>,
  iterable3: Iterable<T3>,
  iterable4: Iterable<T4>,
  iterable5: Iterable<T5>,
  iterable6: Iterable<T6>,
): Generator<[T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined, T5 | undefined, T6 | undefined]>;
/**
 * Creates a sequence of arrays the same length as the *longest* iterable provided. The first array contains the first
 * element from each of the iterables provided. The second array contains the second element from each of the
 * iterables provided, and so on. Missing elements from the shorter iterables are set to undefined.
 *
 * This function was taken from here:
 * https://github.com/toolbuilder/iterablefu/blob/ea8faddc34848192668e502f02da0e859b343d11/src/generators.js#L164
 * The type declarations were adapted from the lodash zip() function.
 *
 * @param  {...Iterable} iterables the iterables to be zipped
 * @returns {Generator} for the zipped arrays
 * @example
 * const a = [0, 1, 2]
 * const b = ['a', 'b', 'c', 'd'] // note that this array is longer than a
 * const generator = zipAll(a, b)
 * console.log([...generator]) // prints [[0, 'a'], [1, 'b'], [2, 'c'], [undefined, 'd']]
 */
export function* zipLongest<T>(...iterables: Array<Iterable<T>>): Generator<Array<T | undefined>> {
  const isDone = (nextResults: IteratorResult<T>[]): boolean => {
    return nextResults.reduce((done: boolean, nextResult): boolean => {
      return done && Boolean(nextResult.done);
    }, true);
  };
  const iterators = iterables.map(x => x[Symbol.iterator]());
  let nextResults = iterators.map(i => i.next());
  while (!isDone(nextResults)) {
    yield nextResults.map(result => result.value);
    nextResults = iterators.map(i => i.next());
  }
}
