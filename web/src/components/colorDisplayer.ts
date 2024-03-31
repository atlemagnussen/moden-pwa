import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { hexFromArgb } from "@material/material-color-utilities"

@customElement('color-displayer')
export class ColorDisplayer extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            cursor: pointer;            
            margin: 0.2rem;
            padding: 0.2rem;
            width: 2rem;
            height: 1.2rem;
        }
        div {
            flex: 1 1 auto;
            width: 100%;
            height: 100%;
        }
    `

    @property({attribute: true, type: Number})
    color = 4294051627
    
    render() {
        const hex = hexFromArgb(this.color)
        return html`
            <div style="background-color: ${hex}"></div>
        `
    }
}
