import { BehaviorSubject, Subject } from "rxjs"
import { getColors } from "@app/services/colorTheme"
import { Theme, hexFromArgb } from "@material/material-color-utilities"

export interface DrawConfig {
    baseColor: string
    lineWidth: number
    darkTheme: boolean
    selectedThemeColor?: string
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
    nextVal.selectedThemeColor = undefined
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
export function setSelectedThemeColor(color?: string) {
    const nextVal = configSubject.getValue()
    if (nextVal.selectedThemeColor === color)
        nextVal.selectedThemeColor = undefined
    else
        nextVal.selectedThemeColor = color
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


export function getTouchColor(idx: number) {
    const config = configSubject.getValue()
    if (config.selectedThemeColor)
        return config.selectedThemeColor as string

    const t = themeSubject.getValue()
    const theme = config.darkTheme ? t.schemes.dark : t.schemes.light
    if (idx === 0)
        return config.baseColor
    if (idx === 1)
        return hexFromArgb(theme.primary)
    if (idx === 2)
        return hexFromArgb(theme.primaryContainer)
    if (idx === 3)
        return hexFromArgb(theme.secondary)
    if (idx === 4)
        return hexFromArgb(theme.secondaryContainer)
    if (idx === 5)
        return hexFromArgb(theme.tertiary)
    if (idx === 6)
        return hexFromArgb(theme.tertiaryContainer)
    else
        return config.baseColor
}

let clearVal = 1
const clearSubject = new Subject<number>()
clearSubject.next(clearVal)

export const clear = clearSubject.asObservable()
export function clearCanvas() {
    clearVal += 1
    clearSubject.next(clearVal)
}