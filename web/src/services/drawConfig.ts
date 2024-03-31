import { BehaviorSubject } from "rxjs"
import { getColors } from "@app/services/colorTheme"
import { Theme } from "@material/material-color-utilities"

export interface DrawConfig {
    baseColor: string
    lineWidth: number
}

// config
let defaultConfig: DrawConfig = {
    baseColor: "#004cff",
    lineWidth: 9
}
const configSubject = new BehaviorSubject(defaultConfig)
export const config = configSubject.asObservable()

export function setConfig(baseColor: string, lineWidth: number) {
    configSubject.next({baseColor, lineWidth})
    const theme = getColors(baseColor)
    setTheme(theme)
}
export function getConfig() {
    const val = configSubject.getValue()
    return val
}

// theme
let themeInitial = getColors(defaultConfig.baseColor)
const themeSubject = new BehaviorSubject(themeInitial)
export const theme = themeSubject.asObservable()
export function setTheme(t: Theme) {
    themeSubject.next(t)
}