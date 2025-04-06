import {SignalWatcher} from "@lit-labs/preact-signals"
import { LitElement, css, html } from "lit"
import { customElement, state } from "lit/decorators.js"
import { themeSignal } from "@app/services/drawConfig"
import { Theme, applyTheme } from "@material/material-color-utilities"

@customElement('about-view')
export class AboutView extends SignalWatcher(LitElement) {
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
    
    @state()
    theme: Theme | null = null

    @state()
    json = ""

    connectedCallback(): void {
        super.connectedCallback()
        themeSignal.subscribe(t => {
            this.theme = t
            console.log(this.theme)
            this.json = JSON.stringify(this.theme, null, 2)
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(this.theme, {target: document.body, dark: systemDark});

        })
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
            <article>
                <label>Json</label>
                <textarea>${this.json}
                </textarea>
            </article>
        `
    }
}
