// import { SignalWatcher } from "@lit-labs/preact-signals"
import { LitElement, css, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { styleMap } from "lit/directives/style-map.js"
import { hexFromArgb } from "@material/material-color-utilities"
import { configSignal } from "@app/services/drawConfig"

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

    @property({attribute: true, type: Number})
    color = 4294051627

    @state()
    selectedColor? = ""
    
    connectedCallback(): void {
        super.connectedCallback()
        configSignal.subscribe(dc => {
            this.selectedColor = dc.selectedThemeColor
        })
    }
    onClicked() {
        const hex = hexFromArgb(this.color)
        this.dispatchEvent(new CustomEvent("color-displayer-clicked", {
            bubbles: true, detail: hex, composed: true
        }))
    }
    render() {
        const hex = hexFromArgb(this.color)
        
        const classes = {
            "selected": this.selectedColor === hex
        }
        const styles = {
            "background-color": hex
        }
        return html`
            <div style=${styleMap(styles)} class=${classMap(classes)}
            @click=${this.onClicked}>
            </div>
        `
    }
}
