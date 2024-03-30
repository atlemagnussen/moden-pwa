import { LitElement, css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { theme } from "@app/services/drawConfig"

@customElement('about-view')
export class AboutView extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: row;
            padding: 1rem;
            overflow-y: auto;
            height: 100%;
        }
        article {
            flex: 1 1 30%
        }
    `
    
    render() {
        return html`
            <article>
                <label>primary</label>
                <palette-displayer .palette=${theme.palettes.primary}></palette-displayer>
                <label>secondary</label>
                <palette-displayer .palette=${theme.palettes.secondary}></palette-displayer>
                <label>tertiary</label>
                <palette-displayer .palette=${theme.palettes.tertiary}></palette-displayer>
                <label>neutral</label>
                <palette-displayer .palette=${theme.palettes.neutral}></palette-displayer>
                <label>neutralVariant</label>
                <palette-displayer .palette=${theme.palettes.neutralVariant}></palette-displayer>
                <label>error</label>
                <palette-displayer .palette=${theme.palettes.error}></palette-displayer>
            </article>
            <article>
                <label>Light</label>
                <scheme-displayer .scheme=${theme.schemes.light}></scheme-displayer>
            </article>
            <article>
                <label>Dark</label>
                <scheme-displayer .scheme=${theme.schemes.dark}></scheme-displayer>
            </article>
        `
    }
}
