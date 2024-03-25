/**
 * Generates a theme from a given hexadecimal color value.
 * The function converts the hex color to an ARGB color, creates a CorePalette from it,
 * and then sets CSS custom properties for various tones of several palettes.
 *
 * @param {string} hexColor - The hexadecimal color value to create the theme from.
 */
declare function setThemeFromHexColor(hexColor: string): void;

export { setThemeFromHexColor };
