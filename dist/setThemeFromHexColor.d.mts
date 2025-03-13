/**
 * @deprecated default value of --md-sys-color-surface-container does not work, needs to probably be a hex color without css custom properties, research how it was able to work before
 * Sets the theme color meta tag to the given hex color.
 *
 * @param {string} color - The color value to set the theme color to. Defaults to the value of the --md-sys-color-surface-container CSS custom property when not provided.
 */
declare function setMetaThemeColor(color?: string): void;
/**
 * @deprecated this function doesn't work with contrast themes
 * Sets the color scheme to a dark theme.
 */
declare function setDarkTheme(): void;
/**
 * Sets the color scheme preference to a dark theme.
 */
declare function setDarkThemePreference(): void;
/**
 * @deprecated this function doesn't work with contrast themes
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

export { enableSystemColorSchemePreferenceListener, setDarkTheme, setDarkThemePreference, setFollowSystemPreference, setInitialTheme, setLightTheme, setLightThemePreference, setMetaThemeColor };
