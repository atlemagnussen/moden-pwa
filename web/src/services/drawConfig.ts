import { getColors } from "@app/services/colorTheme"

interface DrawConfig {
    baseColor: string
    lineWidth: number
}

export let config: DrawConfig = {
    baseColor: "#004cff",
    lineWidth: 9
}

export let theme = getColors(config.baseColor)