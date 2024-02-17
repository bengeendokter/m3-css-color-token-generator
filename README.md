# Material Design 3 CSS custom properties color token generator
## Generate theme
```TypeScript
// main.ts
import {setThemeFromHexColor} from 'm3-css-color-token-generator';
setThemeFromHexColor('#FF0000');

// Add light/dark CSS class to root element
document.documentElement.classList.add('light');
```
## Get light/dark theme CSS
```CSS
/* styles.css */
@import "m3-css-color-token-generator/theme/light";
@import "m3-css-color-token-generator/theme/dark";
```
