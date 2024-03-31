import { LitElement, css, html } from "lit"
import { customElement, state } from "lit/decorators.js"
import { theme } from "@app/services/drawConfig"
import { Theme } from "@material/material-color-utilities"
import { Subscription } from "rxjs"

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
    
    subs: Subscription[] = []
    @state()
    theme: Theme | null = null

    connectedCallback(): void {
        super.connectedCallback()
        this.subs.push(theme.subscribe(t => this.theme = t))
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        this.subs.map(s => s.unsubscribe())
    }
    render() {
        if (!this.theme)
            return html`<span>no theme</span>`
        return html`
            <article>
                <label>primary</label>
                <palette-displayer .palette=${this.theme.palettes.primary}></palette-displayer>
                <label>secondary</label>
                <palette-displayer .palette=${this.theme.palettes.secondary}></palette-displayer>
                <label>tertiary</label>
                <palette-displayer .palette=${this.theme.palettes.tertiary}></palette-displayer>
                <label>neutral</label>
                <palette-displayer .palette=${this.theme.palettes.neutral}></palette-displayer>
                <label>neutralVariant</label>
                <palette-displayer .palette=${this.theme.palettes.neutralVariant}></palette-displayer>
                <label>error</label>
                <palette-displayer .palette=${this.theme.palettes.error}></palette-displayer>
            </article>
            <article>
                <label>Light</label>
                <scheme-displayer .scheme=${this.theme.schemes.light}></scheme-displayer>
            </article>
            <article>
                <label>Dark</label>
                <scheme-displayer .scheme=${this.theme.schemes.dark}></scheme-displayer>
            </article>
        `
    }
}
