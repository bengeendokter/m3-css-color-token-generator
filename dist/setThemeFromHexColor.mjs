// src/setThemeFromHexColor.ts
function setMetaThemeColor(color) {
  if (!color) {
    const surfaceContainerColor = getComputedStyle(document.documentElement).getPropertyValue("--md-sys-color-surface-container");
    color = surfaceContainerColor;
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
function setDarkTheme() {
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
  setMetaThemeColor();
}
function setDarkThemePreference() {
  localStorage.setItem("colorScheme", "dark");
}
function setLightTheme() {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
  setMetaThemeColor();
}
function setLightThemePreference() {
  localStorage.setItem("colorScheme", "light");
}
function setFollowSystemPreference() {
  localStorage.setItem("colorScheme", "os");
}
function setInitialTheme() {
  const colorScheme = localStorage.getItem("colorScheme");
  if (colorScheme === "dark") {
    setDarkTheme();
    return;
  }
  if (colorScheme === "light") {
    setLightTheme();
    return;
  }
  window.matchMedia("(prefers-color-scheme: dark)").matches ? setDarkTheme() : setLightTheme();
}
function enableSystemColorSchemePreferenceListener() {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (["light", "dark"].includes(localStorage.getItem("colorScheme") ?? "os")) {
      return;
    }
    const newColorScheme = event.matches ? "dark" : "light";
    if (newColorScheme === "dark") {
      setDarkTheme();
      return;
    }
    if (newColorScheme === "light") {
      setLightTheme();
      return;
    }
  });
}
export {
  enableSystemColorSchemePreferenceListener,
  setDarkTheme,
  setDarkThemePreference,
  setFollowSystemPreference,
  setInitialTheme,
  setLightTheme,
  setLightThemePreference,
  setMetaThemeColor
};
