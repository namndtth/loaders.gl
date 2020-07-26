export async function* makeIncrementalTransformIterator(
  asyncIterator,
  IncrementalTransform,
  options
) {
  const transform = new IncrementalTransform(options);
  for await (const chunk of asyncIterator) {
    const output = transform.write(chunk);
    yield output;
  }
  const output = transform.end();
  if (output) {
    yield output;
  }
}
