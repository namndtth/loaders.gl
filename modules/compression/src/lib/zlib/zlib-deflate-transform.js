import pako from 'pako';

export default class ZlibDeflateTransform {
  static async deflate(input, options) {
    return ZlibDeflateTransform.deflateSync(input, options);
  }

  static deflateSync(input, options) {
    const uint8Array = new Uint8Array(input);
    const output = pako.deflate(uint8Array, options);
    return output.buffer;
  }

  /**
   * Alternate interface for chunking & without exceptions
   */
  constructor(options) {
    this._inflator = new pako.Inflate();
    // this._inflator.onData = this._onData.bind();
  }

  write(chunk) {
    this._inflator.push(chunk, false); // false -> not last chunk
  }

  end() {
    const emptyChunk = new Uint8Array(0);
    this._inflator.push(emptyChunk, true); // true -> last chunk
    if (this._inflator.err) {
      // console.log(this._inflator.msg);
    }

    const output = this._inflator.result;
    this._inflator = null;
    return output;
  }
}
