import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"

@customElement('grid-view')
export class GridView extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 1rem;
            height: 100%;
        }
    `
    
    render() {
        return html`
            <grid-show></grid-show>
        `
    }
}
