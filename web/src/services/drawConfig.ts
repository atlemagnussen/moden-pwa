import { getColors } from "@app/services/colorTheme"
import { Theme } from "@material/material-color-utilities"

interface DrawConfig {
    baseColor: string
    lineWidth: number
}

export let config: DrawConfig = {
    baseColor: "#004cff",
    lineWidth: 9
}

export let theme = getColors(config.baseColor)

export function setTheme(t: Theme) {
    theme = t
}