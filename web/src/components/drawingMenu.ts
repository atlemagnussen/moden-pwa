import { SignalWatcher } from "@lit-labs/preact-signals"
import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { configSignal, themeSignal, setBaseColor, setLineWidth, setDarkTheme, setSelectedThemeColor, clearCanvas } from "@app/services/drawConfig"

@customElement('drawing-menu')
export class DrawingMenu extends SignalWatcher(LitElement) {
    static styles = css`
        :host {
            display: flex;
            flex-direction: row;
            gap: 0.5rem;
        }
    `

    connectedCallback(): void {
        super.connectedCallback()
    }
    colorChange(e: Event) {
        const target = e.target as HTMLInputElement
        setBaseColor(target.value)
    }
    lineWidthChange(e: Event) {
        const target = e.target as HTMLInputElement
        const lineWidth = parseInt(target.value)
        setLineWidth(lineWidth)
    }
    darkThemeChanged(e: Event) {
        const target = e.target as HTMLInputElement
        setDarkTheme(target.checked)
    }
    colorDisplayerClicked(e: CustomEvent) {
        const color = e.detail as string
        setSelectedThemeColor(color)
    }
    clearCanvas() {
        clearCanvas()
    }
    // uploadImage(e: Event) {
    //     const target = e.target as HTMLInputElement
    //     if (!target.files || target.files.length == 0)
    //         return 
    //     const file = target.files[0]

    //     const image = new Image()
    //     image.onload = () => {
    //         if (this.context)
    //             this.context.drawImage(image, 0, 0)
    //     }
    //     const reader = new FileReader()
    //     reader.addEventListener("load",() => {
    //         image.src = reader.result as string
    //     }, false)

    //     reader.readAsDataURL(file)
    // }
    renderThemeColors() {
        if (!themeSignal)
            return html``

        const themeCol = configSignal.value.darkTheme ? themeSignal.value.schemes.dark : themeSignal.value.schemes.light

        return html`
        <section @color-displayer-clicked=${this.colorDisplayerClicked}>
            <color-displayer .color=${themeCol.primary}></color-displayer>
            <color-displayer .color=${themeCol.primaryContainer}></color-displayer>
            <color-displayer .color=${themeCol.secondary}></color-displayer>
            <color-displayer .color=${themeCol.secondaryContainer}></color-displayer>
            <color-displayer .color=${themeCol.tertiary}></color-displayer>
            <color-displayer .color=${themeCol.tertiaryContainer}></color-displayer>
        </section>
        `
    }
    render() {
        return html`
            <label for="background">Dark
                <input type="checkbox" id="background" .checked=${configSignal.value.darkTheme} @change=${this.darkThemeChanged}>
            </label>
            <input type="color" placeholder="enter hex color" @input=${this.colorChange} value="${configSignal.value.baseColor}">
            <input type="range" min="1" max="50" value="${configSignal.value.lineWidth}" @input=${this.lineWidthChange}>
            ${this.renderThemeColors()}
            <t-button @click=${this.clearCanvas}>clear</t-button>
        `
    }
}
