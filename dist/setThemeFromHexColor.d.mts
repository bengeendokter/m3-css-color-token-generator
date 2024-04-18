/**
 * Generates a theme from a given hexadecimal color value.
 * The function converts the hex color to an ARGB color, creates a CorePalette from it,
 * and then sets CSS custom properties for various tones of several palettes.
 *
 * @param {string} hexColor - The hexadecimal color value to create the theme from.
 */
declare function setThemeFromHexColor(hexColor: string): void;
/**
 * Sets the theme color meta tag to the given hex color.
 *
 * @param {string} color - The color value to set the theme color to.
 */
declare function setMetaThemeColor(color?: string): void;

export { setMetaThemeColor, setThemeFromHexColor };
