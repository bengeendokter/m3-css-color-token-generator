export type ColorScheme = 'light' | 'dark';

export const COLOR_SCHEME: Readonly<{ [Key in Uppercase<ColorScheme>]: Lowercase<Key> & ColorScheme }> = {
  LIGHT: 'light',
  DARK: 'dark',
};

export function isColorScheme(value: string): value is ColorScheme
{
  const colorSchemeValues: string[] = Object.values(COLOR_SCHEME);
  return colorSchemeValues.includes(value);
};

export type Contrast = 'standard' | 'mc' | 'hc';

type ContrastToFullName<OriginalType extends Contrast> =
  OriginalType extends 'mc' ? 'medium-contrast' :
  OriginalType extends 'hc' ? 'high-contrast' :
  OriginalType;

type ContrastFullNameToContrast<FullName extends string> =
  FullName extends 'medium-contrast' ? 'mc' :
  FullName extends 'high-contrast' ? 'hc' :
  FullName;

type ContrastKey<OriginalType extends ContrastToFullName<Contrast>> = OriginalType extends `${infer ContrastLevel}-contrast` ? Uppercase<`${ContrastLevel}_CONTRAST`> : Uppercase<OriginalType>;
type ContrastValue<Key extends ContrastKey<ContrastToFullName<Contrast>>> = Key extends `${infer ContrastLevel}_CONTRAST` ? ContrastFullNameToContrast<`${Lowercase<ContrastLevel>}-contrast`> : Lowercase<Key>;

export const CONTRAST: Readonly<{ [Key in ContrastKey<ContrastToFullName<Contrast>>]: ContrastValue<Key> & Contrast }> = {
  STANDARD: 'standard',
  MEDIUM_CONTRAST: 'mc',
  HIGH_CONTRAST: 'hc',
};

export function isContrast(value: string): value is Contrast
{
  const contrastValues: string[] = Object.values(CONTRAST);
  return contrastValues.includes(value);
};


export type ThemeClass = `${ColorScheme}` | `${ColorScheme}-${ContrastToFullName<Exclude<Contrast, 'standard'>>}`;

type ThemeClassKey<OriginalType extends ThemeClass> = OriginalType extends `${infer ColorScheme}-${infer ContrastLevel}-contrast` ? Uppercase<`${ColorScheme}_${ContrastLevel}_CONTRAST`> : Uppercase<OriginalType>;
type ThemeClassValue<Key extends ThemeClassKey<ThemeClass>> = Key extends `${infer ColorScheme}_${infer ContrastLevel}_CONTRAST` ? `${Lowercase<ColorScheme>}-${Lowercase<ContrastLevel>}-contrast` : Lowercase<Key>;

export const THEME_CLASS: Readonly<{ [Key in ThemeClassKey<ThemeClass>]: ThemeClassValue<Key> & ThemeClass }> = {
  LIGHT: 'light',
  LIGHT_MEDIUM_CONTRAST: 'light-medium-contrast',
  LIGHT_HIGH_CONTRAST: 'light-high-contrast',
  DARK: 'dark',
  DARK_MEDIUM_CONTRAST: 'dark-medium-contrast',
  DARK_HIGH_CONTRAST: 'dark-high-contrast',
};

const lightContrastMap: Readonly<Record<Contrast, ThemeClass>> = {
  [CONTRAST.STANDARD]: THEME_CLASS.LIGHT,
  [CONTRAST.MEDIUM_CONTRAST]: THEME_CLASS.LIGHT_MEDIUM_CONTRAST,
  [CONTRAST.HIGH_CONTRAST]: THEME_CLASS.LIGHT_HIGH_CONTRAST,
};

const darkContrastMap: Readonly<Record<Contrast, ThemeClass>> = {
  [CONTRAST.STANDARD]: THEME_CLASS.DARK,
  [CONTRAST.MEDIUM_CONTRAST]: THEME_CLASS.DARK_MEDIUM_CONTRAST,
  [CONTRAST.HIGH_CONTRAST]: THEME_CLASS.DARK_HIGH_CONTRAST,
};

export const colorSchemeMap: Readonly<Record<ColorScheme, Record<Contrast, ThemeClass>>> = {
  [COLOR_SCHEME.LIGHT]: lightContrastMap,
  [COLOR_SCHEME.DARK]: darkContrastMap,
};

const OS_PREFERENCE = 'os' as const;
const MEDIA_QUERY = {
  PREFERS_COLOR_SCHEME_DARK: '(prefers-color-scheme: dark)',
  PREFERS_CONTRAST_MORE: '(prefers-contrast: more)',
} as const;
const LOCAL_STORAGE = {
  COLOR_SCHEME: 'colorScheme',
  CONTRAST: 'contrast',
} as const;

/**
 * Sets the theme color meta tag to the given hex color.
 *
 * @param {string} color - The css color value to set the theme color to. Defaults to the value of the --md-sys-color-surface-container CSS custom property when not provided.
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
    newMetaTag.setAttribute('content', color);
    document.head.appendChild(newMetaTag);
    return;
  }

  metaTag.setAttribute('content', color);
}

/**
 * Sets the theme by applying the appropriate CSS classes to the root element.
 *
 * @param {Object} params - The parameters for setting the theme.
 * @param {ColorScheme} [params.colorScheme] - The color scheme to set. If not provided, the preferred color scheme will be used.
 * @param {Contrast} [params.contrast] - The contrast level to set. If not provided, the preferred contrast level will be used.
 * @param {boolean} [params.updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
export function setTheme({ colorScheme, contrast, updateMetaThemeColor = true }: Partial<{ colorScheme: ColorScheme, contrast: Contrast, updateMetaThemeColor: boolean }>)
{

  // remove all theme classes from the root element
  Object.values(THEME_CLASS).forEach(themeClass =>
  {
    document.documentElement.classList.remove(themeClass);
  });

  // use parameter values if provided otherwise get preferred values
  const themeColorScheme: ColorScheme = colorScheme ?? getColorSchemePreference();
  const themeContrast: Contrast = contrast ?? getContrastPreference();
  const themeClass: ThemeClass = colorSchemeMap[themeColorScheme][themeContrast];

  // add the theme class to the root
  document.documentElement.classList.add(themeClass);

  if(updateMetaThemeColor)
  {
    setMetaThemeColor();
  }
}

/**
 * Sets the color scheme to a dark theme.
 * 
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
export function setDarkTheme(updateMetaThemeColor = true)
{
  setTheme({ colorScheme: COLOR_SCHEME.DARK, updateMetaThemeColor });
}

/**
 * Sets the color scheme preference to a dark theme.
 */
export function setDarkThemePreference()
{
  // store the color scheme in local storage
  localStorage.setItem(LOCAL_STORAGE.COLOR_SCHEME, COLOR_SCHEME.DARK);
}

/**
 * Sets the color scheme to a light theme.
 * 
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
export function setLightTheme(updateMetaThemeColor = true)
{
  setTheme({ colorScheme: COLOR_SCHEME.LIGHT, updateMetaThemeColor });
}

/**
 * Sets the color scheme preference to a dark theme.
 */
export function setLightThemePreference()
{
  // store the color scheme in local storage
  localStorage.setItem(LOCAL_STORAGE.COLOR_SCHEME, COLOR_SCHEME.LIGHT);
}

/**
 * Sets the color scheme preference to follow system.
 */
export function setOsColorSchemePreference()
{
  // store the color scheme in local storage
  localStorage.setItem(LOCAL_STORAGE.COLOR_SCHEME, OS_PREFERENCE);
}

/**
 * Sets the theme contrast to a standard.
 * 
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
export function setStandardContrastTheme(updateMetaThemeColor = true)
{
  setTheme({ contrast: CONTRAST.STANDARD, updateMetaThemeColor });
}

/**
 * Sets the contrast preference to standard.
 */
export function setStandardContrastThemePreference()
{
  // store the contrast in local storage
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, CONTRAST.STANDARD);
}

/**
 * Sets the theme contrast to a medium.
 * 
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
export function setMediumContrastTheme(updateMetaThemeColor = true)
{
  setTheme({ contrast: CONTRAST.MEDIUM_CONTRAST, updateMetaThemeColor });
}

/**
 * Sets the contrast preference to medium.
 */
export function setMediumContrastThemePreference()
{
  // store the contrast in local storage
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, CONTRAST.MEDIUM_CONTRAST);
}

/**
 * Sets the theme contrast to high.
 * 
 * @param {boolean} [updateMetaThemeColor=true] - Whether to update the theme color meta tag. Defaults to true.
 */
export function setHighContrastTheme(updateMetaThemeColor = true)
{
  setTheme({ contrast: CONTRAST.HIGH_CONTRAST, updateMetaThemeColor });
}

/**
 * Sets the contrast preference to high.
 */
export function setHighContrastThemePreference()
{
  // store the contrast in local storage
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, CONTRAST.HIGH_CONTRAST);
}

/**
 * Sets the contrast preference to follow system.
 */
export function setOsContrastPreference()
{
  // store the contrast in local storage
  localStorage.setItem(LOCAL_STORAGE.CONTRAST, OS_PREFERENCE);
}

/**
 * Sets the color scheme to the initial theme based on stored preference or system preference.
 */
export function getColorSchemePreference(): ColorScheme
{
  const storedPreferenceColorScheme: string = localStorage.getItem(LOCAL_STORAGE.COLOR_SCHEME) ?? OS_PREFERENCE;

  const osColorScheme: ColorScheme = window.matchMedia(MEDIA_QUERY.PREFERS_COLOR_SCHEME_DARK).matches ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT;

  if(!isColorScheme(storedPreferenceColorScheme))
  {
    return osColorScheme;
  }

  return storedPreferenceColorScheme;
}

/**
 * Enables the color scheme preference listener.
 */
export function enableSystemColorSchemePreferenceListener()
{
  // listen for changes in the color scheme preference
  window.matchMedia(MEDIA_QUERY.PREFERS_COLOR_SCHEME_DARK).addEventListener('change', event =>
  {
    const storedPreferenceColorScheme: string = localStorage.getItem(LOCAL_STORAGE.COLOR_SCHEME) ?? OS_PREFERENCE;

    // if the color scheme is explicitly set to light or dark, return
    if(isColorScheme(storedPreferenceColorScheme))
    {
      return;
    }

    const newColorScheme: ColorScheme = event.matches ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT;

    if(newColorScheme === COLOR_SCHEME.DARK)
    {
      setDarkTheme();
      return;
    }

    if(newColorScheme === COLOR_SCHEME.LIGHT)
    {
      setLightTheme();
      return;
    }
  });
}

/**
 * Sets the contrast to the initial contrast on stored preference or system preference.
 */
export function getContrastPreference(): Contrast
{
  const storedPreferenceContrast: string = localStorage.getItem(LOCAL_STORAGE.CONTRAST) ?? OS_PREFERENCE;

  const osContrast: Contrast = window.matchMedia(MEDIA_QUERY.PREFERS_CONTRAST_MORE).matches ? CONTRAST.HIGH_CONTRAST : CONTRAST.STANDARD;

  if(!isContrast(storedPreferenceContrast))
  {
    return osContrast;
  }

  return storedPreferenceContrast;
}

/**
 * Enables the contrast preference listener.
 */
export function enableSystemContrastPreferenceListener()
{
  // listen for changes in the color scheme preference
  window.matchMedia(MEDIA_QUERY.PREFERS_CONTRAST_MORE).addEventListener('change', event =>
  {
    const storedPreferenceContrast: string = localStorage.getItem(LOCAL_STORAGE.CONTRAST) ?? OS_PREFERENCE;

    // if the color scheme is explicitly set to light or dark, return
    if(isContrast(storedPreferenceContrast))
    {
      return;
    }

    const newContrast: Contrast = event.matches ? CONTRAST.HIGH_CONTRAST : CONTRAST.STANDARD;

    if(newContrast === CONTRAST.HIGH_CONTRAST)
    {
      setHighContrastTheme();
      return;
    }

    if(newContrast === CONTRAST.STANDARD)
    {
      setStandardContrastTheme();
      return;
    }
  });
}