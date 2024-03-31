import { BehaviorSubject } from "rxjs"
import { getColors } from "@app/services/colorTheme"
import { Theme } from "@material/material-color-utilities"

export interface DrawConfig {
    baseColor: string
    lineWidth: number
    darkTheme: boolean
}

// config
let defaultConfig: DrawConfig = {
    baseColor: "#004cff",
    lineWidth: 9,
    darkTheme: true
}
const configSubject = new BehaviorSubject(defaultConfig)
export const config = configSubject.asObservable()

export function setBaseColor(baseColor: string) {
    const nextVal = configSubject.getValue()
    nextVal.baseColor = baseColor
    configSubject.next(nextVal)
    const theme = getColors(baseColor)
    setTheme(theme)
}
export function setLineWidth(lineWidth: number) {
    const nextVal = configSubject.getValue()
    nextVal.lineWidth = lineWidth
    configSubject.next(nextVal)
}
export function setDarkTheme(darkTheme: boolean) {
    const nextVal = configSubject.getValue()
    nextVal.darkTheme = darkTheme
    configSubject.next(nextVal)
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