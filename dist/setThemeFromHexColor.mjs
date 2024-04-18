// src/setThemeFromHexColor.ts
import { argbFromHex, CorePalette, rgbaFromArgb } from "@material/material-color-utilities";
function setThemeFromHexColor(hexColor) {
  const corePalette = CorePalette.of(argbFromHex(hexColor));
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
      const paletteColor = rgbaFromArgb(palette.tone(toneValue));
      document.documentElement.style.setProperty(
        `--md-ref-palette-${paletteName}${toneValue}`,
        `rgba(${paletteColor.r}, ${paletteColor.g}, ${paletteColor.b}, ${paletteColor.a})`
      );
    });
  });
}
function setMetaThemeColor(color) {
  if (!color) {
    const surfaceColor = getComputedStyle(document.documentElement).getPropertyValue("--md-sys-color-surface");
    color = surfaceColor;
  }
  const metaTag = document.querySelector('meta[name="theme-color"]');
  if (!metaTag) {
    const newMetaTag = document.createElement("meta");
    newMetaTag.setAttribute("name", "theme-color");
    newMetaTag.setAttribute("content", color);
    document.head.appendChild(newMetaTag);
    return;
  }
  metaTag.setAttribute("content", color);
}
export {
  setMetaThemeColor,
  setThemeFromHexColor
};
