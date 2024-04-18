import { argbFromHex, CorePalette, rgbaFromArgb, TonalPalette } from "@material/material-color-utilities";

/**
 * Generates a theme from a given hexadecimal color value.
 * The function converts the hex color to an ARGB color, creates a CorePalette from it,
 * and then sets CSS custom properties for various tones of several palettes.
 *
 * @param {string} hexColor - The hexadecimal color value to create the theme from.
 */
export function setThemeFromHexColor(hexColor: string)
{
  // Convert the hex color to an ARGB color and create a CorePalette from it
  const corePalette = CorePalette.of(argbFromHex(hexColor));

  // Define a map of palette names to TonalPalettes
  const paletteMap = new Map<string, TonalPalette>([
    ['primary', corePalette.a1],
    ['secondary', corePalette.a2],
    ['tertiary', corePalette.a3],
    ['neutral', corePalette.n1],
    ['neutral-variant', corePalette.n2],
    ['error', corePalette.error]
  ]);

  // Define an array of tone values
  const toneValues = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 100];

  // For each palette in the palette map
  Array.from(paletteMap).forEach(([paletteName, palette]) =>
  {
    // For each tone value
    toneValues.forEach(toneValue =>
    {
      // Get the RGBA color for the current tone of the current palette
      const paletteColor = rgbaFromArgb(palette.tone(toneValue));
      // Set a CSS custom property for the current palette and tone to the RGBA color
      document.documentElement.style.setProperty(`--md-ref-palette-${paletteName}${toneValue}`,
        `rgba(${paletteColor.r}, ${paletteColor.g}, ${paletteColor.b}, ${paletteColor.a})`);
    });
  });
}

/**
 * Sets the theme color meta tag to the given hex color.
 *
 * @param {string} color - The color value to set the theme color to. Defaults to the value of the --md-sys-color-surface CSS custom property when not provided.
 */
export function setMetaThemeColor(color?: string)
{
  // If no hex color is provided, set hexColor to the value of the --md-sys-color-surface CSS custom property
  if(!color)
  {
    const surfaceColor = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-surface');
    color = surfaceColor;
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
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
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
