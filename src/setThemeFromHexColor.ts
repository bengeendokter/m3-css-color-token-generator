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