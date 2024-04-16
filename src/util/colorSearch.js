/**
 * Calculates the Euclidean distance between two colors in RGB space.
 * @param {object} color1 - The first color object containing RGB values.
 * @param {object} color2 - The second color object containing RGB values.
 * @returns {number} The Euclidean distance between the two colors.
 */
function calculateColorDifference(color1, color2) {
  const deltaR = color1.r - color2.r;
  const deltaG = color1.g - color2.g;
  const deltaB = color1.b - color2.b;

  return Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB);
}

/**
 * Sorts an array of colors based on their similarity to the input color.
 * @param {object} inputColor - The input color object containing RGB values.
 * @param {object[]} colors - An array of color objects to be sorted.
 * @returns {object[]} The sorted array of colors.
 */
function sortByColorSimilarity(inputColor, colors) {
  return colors.sort((color1, color2) => {
    const difference1 = calculateColorDifference(inputColor, color1.rgb);
    const difference2 = calculateColorDifference(inputColor, color2.rgb);
    return difference1 - difference2; // Ascending order
  });
}
