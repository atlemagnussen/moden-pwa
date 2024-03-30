import { argbFromHex, themeFromSourceColor } from "@material/material-color-utilities"

export function getColors(source: string) {
    const theme = themeFromSourceColor(argbFromHex(source))
    return theme
}
// Get the theme from a hex color


// Check if the user has dark mode turned on
//const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply the theme to the body by updating custom properties for material tokens
//applyTheme(theme, {target: document.body, dark: systemDark});