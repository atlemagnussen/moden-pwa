import { LitElement, css, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { hexFromArgb } from "@material/material-color-utilities"
import { DrawConfig, config } from "@app/services/drawConfig"
import { Subscription } from "rxjs"

@customElement('color-displayer')
export class ColorDisplayer extends LitElement {
    static styles = css`
        :host {
            display: inline-flex;
            cursor: pointer;            
            margin: 0.2rem;
            width: 2rem;
            height: 1.2rem;
        }
        * {
            box-sizing: border-box;
        }
        div {
            border: 4px solid transparent;
            flex: 1 1 auto;
            width: 100%;
            height: 100%;
        }
        div.selected {
            border-color: white;
        }
    `

    subs: Subscription[] = []

    @property({attribute: true, type: Number})
    color = 4294051627
    
    @state()
    config?: DrawConfig

    connectedCallback(): void {
        super.connectedCallback()
        this.subs.push(config.subscribe(c => {
            this.config = c
            this.requestUpdate()
        }))
    }

    onClicked() {
        const hex = hexFromArgb(this.color)
        this.dispatchEvent(new CustomEvent("color-displayer-clicked", {
            bubbles: true, detail: hex, composed: true
        }))
    }
    render() {
        const hex = hexFromArgb(this.color)
        const selected = this.config?.selectedThemeColor == hex
        return html`
            <div style="background-color: ${hex}" class="${selected ? 'selected' : ''}"
            @click=${this.onClicked}>
            </div>
        `
    }
}
