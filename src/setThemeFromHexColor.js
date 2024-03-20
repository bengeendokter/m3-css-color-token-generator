"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setThemeFromHexColor = void 0;
var material_color_utilities_1 = require("@material/material-color-utilities");
/**
 * Generates a theme from a given hexadecimal color value.
 * The function converts the hex color to an ARGB color, creates a CorePalette from it,
 * and then sets CSS custom properties for various tones of several palettes.
 *
 * @param {string} hexColor - The hexadecimal color value to create the theme from.
 */
function setThemeFromHexColor(hexColor) {
    // Convert the hex color to an ARGB color and create a CorePalette from it
    var corePalette = material_color_utilities_1.CorePalette.of((0, material_color_utilities_1.argbFromHex)(hexColor));
    // Define a map of palette names to TonalPalettes
    var paletteMap = new Map([
        ['primary', corePalette.a1],
        ['secondary', corePalette.a2],
        ['tertiary', corePalette.a3],
        ['neutral', corePalette.n1],
        ['neutral-variant', corePalette.n2],
        ['error', corePalette.error]
    ]);
    // Define an array of tone values
    var toneValues = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 100];
    // For each palette in the palette map
    Array.from(paletteMap).forEach(function (_a) {
        var paletteName = _a[0], palette = _a[1];
        // For each tone value
        toneValues.forEach(function (toneValue) {
            // Get the RGBA color for the current tone of the current palette
            var paletteColor = (0, material_color_utilities_1.rgbaFromArgb)(palette.tone(toneValue));
            // Set a CSS custom property for the current palette and tone to the RGBA color
            document.documentElement.style.setProperty("--md-ref-palette-".concat(paletteName).concat(toneValue), "rgba(".concat(paletteColor.r, ", ").concat(paletteColor.g, ", ").concat(paletteColor.b, ", ").concat(paletteColor.a, ")"));
        });
    });
}
exports.setThemeFromHexColor = setThemeFromHexColor;
