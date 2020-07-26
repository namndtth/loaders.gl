import {IncrementalTransform} from '../types';

/**
 *
 * @param asyncIterator
 * @param IncrementalTransform
 * @param options
 */
export function makeIncrementalTransformIterator(
  asyncIterator: AsyncIterable<ArrayBuffer>,
  transform: IncrementalTransform,
  options: object
): AsyncIterable<any>;
