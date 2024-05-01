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
 * @param {string} color - The color value to set the theme color to. Defaults to the value of the --md-sys-color-surface-container CSS custom property when not provided.
 */
declare function setMetaThemeColor(color?: string): void;
/**
 * Sets the color scheme to a dark theme.
 */
declare function setDarkTheme(): void;
/**
 * Sets the color scheme preference to a dark theme.
 */
declare function setDarkThemePreference(): void;
/**
 * Sets the color scheme to a light theme.
 */
declare function setLightTheme(): void;
/**
 * Sets the color scheme preference to a dark theme.
 */
declare function setLightThemePreference(): void;
/**
 * Sets the color scheme preference to follow system.
 */
declare function setFollowSystemPreference(): void;
/**
 * Sets the color scheme to the initial theme based on stored preference or system preference.
 */
declare function setInitialTheme(): void;
/**
 * Enables the color scheme preference listener.
 */
declare function enableSystemColorSchemePreferenceListener(): void;

export { enableSystemColorSchemePreferenceListener, setDarkTheme, setDarkThemePreference, setFollowSystemPreference, setInitialTheme, setLightTheme, setLightThemePreference, setMetaThemeColor, setThemeFromHexColor };
