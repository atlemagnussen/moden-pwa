import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { config, setTheme } from "@app/services/drawConfig"
import { getColors } from "@app/services/colorTheme"

@customElement('drawing-menu')
export class DrawingMenu extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: row;
        }
    `

    colorChange(e: Event) {
        const target = e.target as HTMLInputElement
        const color = target.value
        config.baseColor = color
        const t = getColors(color)
        setTheme(t)
    }
    lineWidthChange(e: Event) {
        const target = e.target as HTMLInputElement
        const lineWidth = parseInt(target.value)
        config.lineWidth = lineWidth
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
    render() {
        return html`
            <input type="color" placeholder="enter hex color" @input=${this.colorChange} value="${config.baseColor}">
            <input type="range" min="1" max="50" value="${config.lineWidth}" @input=${this.lineWidthChange}>
            <!-- <t-button @click=${this.clearCanvas}>clear</t-button> -->
            <!-- <input type="file" name="filename" accept="image/*" @change=${this.uploadImage}> -->
        `
    }
}
