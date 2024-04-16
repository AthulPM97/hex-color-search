/**
 * Iterates over an array in batches and applies a callback function to each batch.
 * @param {Array} array - The array to iterate over.
 * @param {number} batchSize - The size of each batch.
 * @param {Function} callback - The function to apply to each batch.
 * @returns {void}
 */
export function batchOperation(array, batchSize, callback) {
  for (let i = 0; i < array.length; i += batchSize) {
    const batch = array.slice(i, i + batchSize);
    callback(batch);
  }
}
