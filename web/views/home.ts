import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"

@customElement('home-view')
export class HomeView extends LitElement {
    static styles = css`
        :host {
            display: block;
            padding: 1rem;
        }
    `
    
    render() {
        return html`
            <article>
                <header>
                    <h1>Me</h1>
                </header>

                <section>
                    <h2>App</h2>
                </section>
            </article>
        `
    }
}
