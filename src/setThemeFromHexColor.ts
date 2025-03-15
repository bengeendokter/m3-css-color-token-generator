type ColorScheme = 'light' | 'dark';

const COLOR_SCHEME: Readonly<{ [Key in Uppercase<ColorScheme>]: Lowercase<Key> & ColorScheme }> = {
  LIGHT: 'light',
  DARK: 'dark',
};

function isColorScheme(value: string): value is ColorScheme
{
  return value in Object.values(COLOR_SCHEME);
};

type Contrast = 'standard' | 'mc' | 'hc';

const CONTRAST: Readonly<{ [Key in Uppercase<Contrast>]: Lowercase<Key> & Contrast }> = {
  STANDARD: 'standard',
  MC: 'mc',
  HC: 'hc',
};

function isContrast(value: string): value is Contrast
{
  return value in Object.values(CONTRAST);
};

type ThemeClass = `${ColorScheme}` | `${ColorScheme}-${Exclude<Contrast, 'standard'>}`;

type ThemeClassKey<OriginalType extends ThemeClass> = OriginalType extends `${infer ColorScheme}-${infer Contrast}` ? Uppercase<`${ColorScheme}_${Contrast}`> : Uppercase<OriginalType>;
type ThemeClassValue<Key extends ThemeClassKey<ThemeClass>> = Key extends `${infer ColorScheme}_${infer Contrast}` ? `${Lowercase<ColorScheme>}-${Lowercase<Contrast>}` : Lowercase<Key>;

const THEME_CLASS: Readonly<{ [Key in ThemeClassKey<ThemeClass>]: ThemeClassValue<Key> & ThemeClass }> = {
  LIGHT: 'light',
  LIGHT_MC: 'light-mc',
  LIGHT_HC: 'light-hc',
  DARK: 'dark',
  DARK_MC: 'dark-mc',
  DARK_HC: 'dark-hc',
};

function isThemeClass(value: string): value is ThemeClass
{
  return value in Object.values(THEME_CLASS);
};

/**
 * Sets the theme color meta tag to the given hex color.
 *
 * @param {string} color - The color value to set the theme color to. Defaults to the value of the --md-sys-color-surface-container CSS custom property when not provided.
 */
export function setMetaThemeColor(color?: string)
{
  // If no hex color is provided, set hexColor to the value of the --md-sys-color-surface-container CSS custom property
  if(!color)
  {
    const surfaceContainerColor = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-surface-container');
    color = surfaceContainerColor;
  }

  // Set the theme color meta tag to the given hex color
  const metaTag = document.querySelector('meta[name="theme-color"]');

  // If meta tag does not exist, create a new one
  if(!metaTag)
  {
    const newMetaTag = document.createElement('meta');
    newMetaTag.setAttribute('name', 'theme-color');
    console.log("color", color);
    newMetaTag.setAttribute('content', color);
    document.head.appendChild(newMetaTag);
    return;
  }

  metaTag.setAttribute('content', color);
}

/**
 * @deprecated this function doesn't work with contrast themes
 * Sets the color scheme to a dark theme.
 */
export function setDarkTheme()
{
  // remove "light" class from the root element
  document.documentElement.classList.remove('light');

  // add "dark" class to the root element
  document.documentElement.classList.add('dark');

  // update the theme color meta tag
  setMetaThemeColor();
}

/**
 * Sets the color scheme preference to a dark theme.
 */
export function setDarkThemePreference()
{
  // store the color scheme in local storage
  localStorage.setItem("colorScheme", 'dark');
}

/**
 * @deprecated this function doesn't work with contrast themes
 * Sets the color scheme to a light theme.
 */
export function setLightTheme()
{
  // remove "dark" class from the root element
  document.documentElement.classList.remove('dark');

  // add "light" class to the root element
  document.documentElement.classList.add('light');

  // update the theme color meta tag
  setMetaThemeColor();
}

/**
 * Sets the color scheme preference to a dark theme.
 */
export function setLightThemePreference()
{
  // store the color scheme in local storage
  localStorage.setItem("colorScheme", 'light');
}

/**
 * Sets the color scheme preference to follow system.
 */
export function setFollowSystemPreference()
{
  // store the color scheme in local storage
  localStorage.setItem("colorScheme", 'os');
}

/**
 * Sets the color scheme to the initial theme based on stored preference or system preference.
 */
export function setInitialTheme()
{
  const colorScheme = localStorage.getItem("colorScheme");
  if(colorScheme === 'dark')
  {
    setDarkTheme();
    return;
  }

  if(colorScheme === 'light')
  {
    setLightTheme();
    return;
  }

  window.matchMedia('(prefers-color-scheme: dark)').matches ? setDarkTheme() : setLightTheme();
}

/**
 * Enables the color scheme preference listener.
 */
export function enableSystemColorSchemePreferenceListener()
{
  // listen for changes in the color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event =>
  {
    // if the color scheme is explicitly set to light or dark, return
    if(["light", "dark"].includes(localStorage.getItem("colorScheme") ?? 'os'))
    {
      return;
    }

    const newColorScheme = event.matches ? "dark" : "light";

    if(newColorScheme === "dark")
    {
      setDarkTheme();
      return;
    }

    if(newColorScheme === "light")
    {
      setLightTheme();
      return;
    }
  });
}

/**
 * Sets the contrast to the initial contrast on stored preference or system preference.
 */


// TODO add enableSystemContrastPreferenceListener