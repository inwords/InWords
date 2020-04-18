const flatMap = (array, callback) =>
  Array.prototype.concat.apply([], array.map(callback));

export default flatMap;
