import { handleDarkThemeButtonPressed, handleHighContrastButtonPressed, handleLightThemeButtonPressed, handleMediumContrastButtonPressed, handleOsColorSchemeButtonPressed, handleOsContrastButtonPressed, handleStandardContrastButtonPressed, setTheme } from "./theme";

setTheme();

 // @ts-ignore
const lightButton: HTMLButtonElement = window["light-button"];
lightButton.addEventListener("click", () => {
    handleLightThemeButtonPressed();
});

 // @ts-ignore
 const darkButton: HTMLButtonElement = window["dark-button"];
 darkButton.addEventListener("click", () => {
     handleDarkThemeButtonPressed();
 });

// @ts-ignore
const osColorScheme: HTMLButtonElement = window["os-color-scheme-button"];
osColorScheme.addEventListener("click", () => {
    handleOsColorSchemeButtonPressed();
});

// @ts-ignore
const standardContrastButton: HTMLButtonElement = window["standard-contrast-button"];
standardContrastButton.addEventListener("click", () => {
    handleStandardContrastButtonPressed();
});

// @ts-ignore
const mediumContrastButton: HTMLButtonElement = window["medium-contrast-button"];
mediumContrastButton.addEventListener("click", () => {
    handleMediumContrastButtonPressed();
});

// @ts-ignore
const highContrastButton: HTMLButtonElement = window["high-contrast-button"];
highContrastButton.addEventListener("click", () => {
    handleHighContrastButtonPressed();
});

// @ts-ignore
const osContrastButton: HTMLButtonElement = window["os-contrast-button"];
osContrastButton.addEventListener("click", () => {
    handleOsContrastButtonPressed();
});