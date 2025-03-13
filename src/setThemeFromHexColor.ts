/**
 * @deprecated default value of --md-sys-color-surface-container does not work, needs to probably be a hex color without css custom properties, research how it was able to work before
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

// TODO add enableSystemContrastPreferenceListener
