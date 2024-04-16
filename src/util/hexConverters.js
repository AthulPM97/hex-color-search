/**
 * Converts a hexadecimal color code to RGB format.
 * @param {string} hex - The hexadecimal color code (e.g., "#FF0000").
 * @returns {object} An object containing the RGB values of the input hexadecimal color code.
 */
export function hexToRgb(hex) {
  // Remove # from hex code if present
  hex = hex.replace(/^#/, "");

  // Convert hex to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Converts RGB color values to HSL (Hue, Saturation, Lightness) format.
 * @param {number} r - The red component of the RGB color (0-255).
 * @param {number} g - The green component of the RGB color (0-255).
 * @param {number} b - The blue component of the RGB color (0-255).
 * @returns {object} An object containing the HSL values of the input RGB color.
 */
export function rgbToHsl(r, g, b) {
  // Normalize RGB values to the range [0, 1]
  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60; // Convert hue to degrees
  }

  return { h: Math.ceil(h), s: Math.round(s*100), l: Math.round(l*100) };
}