"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/setThemeFromHexColor.ts
var setThemeFromHexColor_exports = {};
__export(setThemeFromHexColor_exports, {
  setThemeFromHexColor: () => setThemeFromHexColor
});
module.exports = __toCommonJS(setThemeFromHexColor_exports);
var import_material_color_utilities = require("@material/material-color-utilities");
function setThemeFromHexColor(hexColor) {
  const corePalette = import_material_color_utilities.CorePalette.of((0, import_material_color_utilities.argbFromHex)(hexColor));
  const paletteMap = /* @__PURE__ */ new Map([
    ["primary", corePalette.a1],
    ["secondary", corePalette.a2],
    ["tertiary", corePalette.a3],
    ["neutral", corePalette.n1],
    ["neutral-variant", corePalette.n2],
    ["error", corePalette.error]
  ]);
  const toneValues = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 100];
  Array.from(paletteMap).forEach(([paletteName, palette]) => {
    toneValues.forEach((toneValue) => {
      const paletteColor = (0, import_material_color_utilities.rgbaFromArgb)(palette.tone(toneValue));
      document.documentElement.style.setProperty(
        `--md-ref-palette-${paletteName}${toneValue}`,
        `rgba(${paletteColor.r}, ${paletteColor.g}, ${paletteColor.b}, ${paletteColor.a})`
      );
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setThemeFromHexColor
});
