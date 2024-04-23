import {signal} from "@lit-labs/preact-signals"

import { getColors } from "@app/services/colorTheme"
import { Theme, hexFromArgb } from "@material/material-color-utilities"

export interface DrawConfig {
    baseColor: string
    lineWidth: number
    darkTheme: boolean
    selectedThemeColor?: string
}

// config
let initialConfig: DrawConfig = {
    baseColor: "#004cff",
    lineWidth: 9,
    darkTheme: true
}
const savedConfigStr = localStorage.getItem("config")
if (savedConfigStr) {
    try {
        const savedConfig = JSON.parse(savedConfigStr)
        initialConfig = savedConfig
    }
    catch(err) {
        console.error("error parsing saved config from localstorage", err)
    }
}
function saveConfig() {
    const value = getConfigClone()
    const valueStr = JSON.stringify(value)
    localStorage.setItem("config", valueStr)
}
export const configSignal = signal(initialConfig)

export function setBaseColor(baseColor: string) {
    const nextVal = getConfigClone()
    nextVal.baseColor = baseColor
    nextVal.selectedThemeColor = undefined
    configSignal.value = nextVal
    const theme = getColors(baseColor)
    setTheme(theme)
    saveConfig()
}
export function setLineWidth(lineWidth: number) {
    const nextVal = getConfigClone()
    nextVal.lineWidth = lineWidth
    configSignal.value = nextVal
    saveConfig()
}
export function setDarkTheme(darkTheme: boolean) {
    const nextVal = getConfigClone()
    nextVal.darkTheme = darkTheme
    configSignal.value = nextVal
    saveConfig()
}
export function setSelectedThemeColor(color?: string) {
    const nextVal = getConfigClone()
        if (nextVal.selectedThemeColor === color)
        nextVal.selectedThemeColor = undefined
    else
        nextVal.selectedThemeColor = color

    configSignal.value = nextVal
}

// theme
let themeInitial = getColors(initialConfig.baseColor)
export const themeSignal = signal(themeInitial)
export function setTheme(t: Theme) {
    themeSignal.value = t
}

function getConfigClone() {
    const confVal = configSignal.peek()
    return structuredClone(confVal)
}

export function getTouchColor(idx: number) {
    const confVal = getConfigClone()

    if (confVal.selectedThemeColor)
        return confVal.selectedThemeColor as string

    const themeVal = themeSignal.peek()
    const them = confVal.darkTheme ? themeVal.schemes.dark : themeVal.schemes.light

    if (idx === 0)
        return confVal.baseColor
    if (idx === 1)
        return hexFromArgb(them.primary)
    if (idx === 2)
        return hexFromArgb(them.primaryContainer)
    if (idx === 3)
        return hexFromArgb(them.secondary)
    if (idx === 4)
        return hexFromArgb(them.secondaryContainer)
    if (idx === 5)
        return hexFromArgb(them.tertiary)
    if (idx === 6)
        return hexFromArgb(them.tertiaryContainer)
    else
        return confVal.baseColor
}

let clearVal = 1
export const clearSignal = signal(clearVal)

export function clearCanvas() {
    clearVal += 1
    clearSignal.value = clearVal
}