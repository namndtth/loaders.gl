import {IncrementalTransform} from "../../types";

/**
 * A transform that incrementally zlib compresses / deflates input bytes
 */
export default class ZlibDeflateTransform implements IncrementalTransform {
  /**
   * Deflate
   */
  static deflate(input: ArrayBuffer, options?: object): Promise<ArrayBuffer>;
  static deflateSync(input: ArrayBuffer, options?: object): ArrayBuffer;

  /**
   * Alternate interface for chunking & without exceptions
   * @param options
   */
  constructor(options: object);

  write(chunk: ArrayBuffer): ArrayBuffer | null;

  end(): ArrayBuffer | null;
}
