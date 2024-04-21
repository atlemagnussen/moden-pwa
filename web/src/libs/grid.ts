import { LitElement, css, html } from "lit"
import { customElement, property, query } from "lit/decorators.js"
import { styleMap } from "lit/directives/style-map.js"
import { GridShowEngine, GridShowOptions, GridShowWidget } from "./gridShow"

@customElement('grid-show')
export class GridShow extends LitElement {
    static styles = css`
        :host {
            display: block;
            border: 1px solid yellow;
        }
        * {
            box-sizing: border-box;
        }
        .grid-item {
            background-color: green;
            position: absolute;
            border: 1px solid red;
        }
        #digilean-grid > .grid-item {
            width: 2.5%;
        }
        #digilean-grid > .grid-item[g-x="1"] {
            left: 2.5%;
        }
        /* 2 - 5% */
        #digilean-grid > .grid-item[g-w="2"] {
            width: 5%;
        }
        #digilean-grid > .grid-item[g-x="2"] {
            left: 5%;
        }
        /* 3 - 7.5% */
        #digilean-grid > .grid-item[g-w="3"] {
            width: 7.5%;
        }
        #digilean-grid > .grid-item[g-x="3"] {
            left: 7.5%;
        }
        /* 4 - 10% */
        #digilean-grid > .grid-item[g-w="4"] {
            width: 10%;
        }
        #digilean-grid > .grid-item[g-x="4"] {
            left: 10%;
        }
        /* 5 - 12.5% */
        #digilean-grid > .grid-item[g-w="5"] {
            width: 12.5%;
        }
        #digilean-grid > .grid-item[g-x="5"] {
            left: 12.5%;
        }
        /* 6 - 15% */
        #digilean-grid > .grid-item[g-w="6"] {
            width: 15%;
        }
        #digilean-grid > .grid-item[g-x="6"] {
            left: 15%;
        }
        /* 7 - 17.5% */
        #digilean-grid > .grid-item[g-w="7"] {
            width: 17.5%;
        }
        #digilean-grid > .grid-item[g-x="7"] {
            left: 17.5%;
        }
        /* 8 - 20%*/
        #digilean-grid > .grid-item[g-w="8"] {
            width: 20%;
        }
        #digilean-grid > .grid-item[g-x="8"] {
            left: 20%;
        }
        /* 9 - 22.5% */
        #digilean-grid > .grid-item[g-w="9"] {
            width: 22.5%;
        }
        #digilean-grid > .grid-item[g-x="9"] {
            left: 22.5%;
        }
        /* 10 - 25% */
        #digilean-grid > .grid-item[g-w="10"] {
            width: 25%;
        }
        #digilean-grid > .grid-item[g-x="10"] {
            left: 25%;
        }
        /* 11 - 27.5% */
        #digilean-grid > .grid-item[g-w="11"] {
            width: 27.5%;
        }
        #digilean-grid > .grid-item[g-x="11"] {
            left: 27.5%;
        }
        /* 12 - 30% */
        #digilean-grid > .grid-item[g-w="12"] {
            width: 30%;
        }
        #digilean-grid > .grid-item[g-x="12"] {
            left: 30%;
        }
        /* 13 - 32.5% */
        #digilean-grid > .grid-item[g-w="13"] {
            width: 32.5%;
        }
        #digilean-grid > .grid-item[g-x="13"] {
            left: 32.5%;
        }
        /* 14 - 35% */
        #digilean-grid > .grid-item[g-w="14"] {
            width: 35%;
        }
        #digilean-grid > .grid-item[g-x="14"] {
            left: 35%;
        }
        /* 15 - 37.5% */
        #digilean-grid > .grid-item[g-w="15"] {
            width: 37.5%;
        }
        #digilean-grid > .grid-item[g-x="15"] {
            left: 37.5%;
        }
        /* 16 - 40% */
        #digilean-grid > .grid-item[g-w="16"] {
            width: 40%;
        }
        #digilean-grid > .grid-item[g-x="16"] {
            left: 40%;
        }
        /* 17 - 42.5% */
        #digilean-grid > .grid-item[g-w="17"] {
            width: 42.5%;
        }
        #digilean-grid > .grid-item[g-x="17"] {
            left: 42.5%;
        }
        /* 18 - 45% */
        #digilean-grid > .grid-item[g-w="18"] {
            width: 45%;
        }
        #digilean-grid > .grid-item[g-x="18"] {
            left: 45%;
        }
        /* 19 - 47.5% */
        #digilean-grid > .grid-item[g-w="19"] {
            width: 47.5%;
        }
        #digilean-grid > .grid-item[g-x="19"] {
            left: 47.5%;
        }
        /* 20 - 50% */
        #digilean-grid > .grid-item[g-w="20"] {
            width: 50%;
        }
        #digilean-grid > .grid-item[g-x="20"] {
            left: 50%;
        }
        /* 21 - 52.5% */
        #digilean-grid > .grid-item[g-w="21"] {
            width: 52.5%;
        }
        #digilean-grid > .grid-item[g-x="21"] {
            left: 52.5%;
        }
        /* 22 - 55% */
        #digilean-grid > .grid-item[g-w="22"] {
            width: 55%;
        }
        #digilean-grid > .grid-item[g-x="22"] {
            left: 55%;
        }
        /* 23 - 57.5% */
        #digilean-grid > .grid-item[g-w="23"] {
            width: 57.5%;
        }
        #digilean-grid > .grid-item[g-x="23"] {
            left: 57.5%;
        }
        /* 24 - 60% */
        #digilean-grid > .grid-item[g-w="24"] {
            width: 60%;
        }
        #digilean-grid > .grid-item[g-x="24"] {
            left: 60%;
        }
        /* 25 - 62.5% */
        #digilean-grid > .grid-item[g-w="25"] {
            width: 62.5%;
        }
        #digilean-grid > .grid-item[g-x="25"] {
            left: 62.5%;
        }
        /* 26 - 65% */
        #digilean-grid > .grid-item[g-w="26"] {
            width: 65%;
        }
        #digilean-grid > .grid-item[g-x="26"] {
            left: 65%;
        }
        /* 27 - 67.5% */
        #digilean-grid > .grid-item[g-w="27"] {
            width: 67.5%;
        }
        #digilean-grid > .grid-item[g-x="27"] {
            left: 67.5%;
        }
        /* 28 - 70% */
        #digilean-grid > .grid-item[g-w="28"] {
            width: 70%;
        }
        #digilean-grid > .grid-item[g-x="28"] {
            left: 70%;
        }
        /* 29 - 72.5% */
        #digilean-grid > .grid-item[g-w="29"] {
            width: 72.5%;
        }
        #digilean-grid > .grid-item[g-x="29"] {
            left: 72.5%;
        }
        /* 30 - 75% */
        #digilean-grid > .grid-item[g-w="30"] {
            width: 75%;
        }
        #digilean-grid > .grid-item[g-x="30"] {
            left: 75%;
        }
        /* 31 - 77.5% */
        #digilean-grid > .grid-item[g-w="31"] {
            width: 77.5%;
        }
        #digilean-grid > .grid-item[g-x="31"] {
            left: 77.5%;
        }
        /* 32 - 80% */
        #digilean-grid > .grid-item[g-w="32"] {
            width: 80%;
        }
        #digilean-grid > .grid-item[g-x="32"] {
            left: 80%;
        }
        /* 33 - 82.5% */
        #digilean-grid > .grid-item[g-w="33"] {
            width: 82.5%;
        }
        #digilean-grid > .grid-item[g-x="33"] {
            left: 82.5%;
        }
        /* 34 - 85% */
        #digilean-grid > .grid-item[g-w="34"] {
            width: 85%;
        }
        #digilean-grid > .grid-item[g-x="34"] {
            left: 85%;
        }
        /* 35 - 87.5% */
        #digilean-grid > .grid-item[g-w="35"] {
            width: 87.5%;
        }
        #digilean-grid > .grid-item[g-x="35"] {
            left: 87.5%;
        }
        /* 36 - 90% */
        #digilean-grid > .grid-item[g-w="36"] {
            width: 90%;
        }
        #digilean-grid > .grid-item[g-x="36"] {
            left: 90%;
        }
        /* 37 - 92.5% */
        #digilean-grid > .grid-item[g-w="37"] {
            width: 92.5%;
        }
        #digilean-grid > .grid-item[g-x="37"] {
            left: 92.5%;
        }
        /* 38 - 95% */
        #digilean-grid > .grid-item[g-w="38"] {
            width: 95%;
        }
        #digilean-grid > .grid-item[g-x="38"] {
            left: 95%;
        }
        /* 39 - 97.5% */
        #digilean-grid > .grid-item[g-w="39"] {
            width: 97.5%;
        }
        #digilean-grid > .grid-item[g-x="39"] {
            left: 97.5%;
        }
        /* 40 - 100% */
        #digilean-grid > .grid-item[g-w="40"] {
            width: 100%;
        }
    `
    
    @property({type: Object})
    options: GridShowOptions = {
        cols: 40,
        rows: 30
    }
    @query("#digilean-grid")
    gridEl: HTMLElement | undefined
    engine: GridShowEngine | undefined

    widgets: GridShowWidget[] = [
        {
            x: 0, y: 0, w: 2, h: 2
        },
        {
            x: 2, y: 0, w: 2, h: 2
        },
        {
            x: 4, y: 0, w: 2, h: 2
        },
        {
            x: 6, y: 0, w: 2, h: 2
        },
        {
            x: 8, y: 0, w: 2, h: 2
        },
        {
            x: 10, y: 0, w: 2, h: 2
        }
    ]

    renderWidget(w: GridShowWidget) {
        if (!this.engine)
            return html``

        const cellWidth = this.engine.getGridCellWidth()
        const wHeight = cellWidth * w.h
        const height = `${wHeight}px`

        const styles = { height }
        return html`
            <div class="grid-item" g-x="${w.x}" g-y="${w.y}" g-w="${w.w}" g-h="${w.h}" style=${styleMap(styles)}>
                <span>Test</span>
            </div>
        `
    }
    protected firstUpdated() {
        if (this.gridEl) {
            this.engine = new GridShowEngine(this.gridEl, this.options)
            this.requestUpdate()
        }
            
    }
    render() {

        return html`
            <div id="digilean-grid">
                ${this.widgets.map(w => this.renderWidget(w))}
            </div>
        `
    }
}
