import { LitElement, css, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import { Scheme } from "@material/material-color-utilities"

@customElement('scheme-displayer')
export class SchemeDisplayer extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: .1rem;
        }
    `
    
    @property({attribute: false})
    scheme: Scheme | null = null

    render() {
        if (!this.scheme)
            return html`<span>no scheme</span>`

        /// @ts-ignore
        const props = Object.keys(this.scheme.props)

        return html`
            ${props.map(p => {
                const label = p
                ///@ts-ignore
                const argb = this.scheme[p] as number
                return html`
                <div>
                    <color-displayer .color=${argb}></color-displayer>
                    <label>${label}</label>
                </div>
                `
            })}
            
        `
    }
}
