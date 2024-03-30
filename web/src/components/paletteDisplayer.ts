import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { TonalPalette } from "@material/material-color-utilities"

@customElement('palette-displayer')
export class PaletteDisplayer extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: .1rem;
        }
    `
    
    @property({attribute: false})
    palette: TonalPalette | null = null

    render() {
        if (!this.palette)
            return html`<span>no palette</span>`

        /// @ts-ignore
        const argb = this.palette.keyColor.argb
        return html`
            <color-displayer color="${argb}"></color-displayer>
        `
    }
}
