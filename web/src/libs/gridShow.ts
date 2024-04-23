export interface GridShowOptions {
    cols: number
    rows: number
}

export interface GridShowWidget {
    x: number
    y: number
    w: number
    h: number
}

export class GridShowEngine {
    gridEl: HTMLElement
    options: GridShowOptions
    /**
     * opts
     */
    constructor(el: HTMLElement, opts: GridShowOptions) {
        this.gridEl = el
        this.options = opts
    }

    getGridCellWidth() {
        return this.gridEl.offsetWidth / this.options.cols
    }

    createWidgetEl(widget: GridShowWidget) {
        const wEl = document.createElement("div")

        const cellWidth = this.getGridCellWidth()
        const widgetHeight = widget.h * cellWidth;
        
        wEl.setAttribute("gs-x", widget.x.toString())
        wEl.setAttribute("gs-y", widget.y.toString())
        wEl.setAttribute("gs-w", widget.w.toString())
        wEl.setAttribute("gs-h", widget.h.toString())
        wEl.style.setProperty("height", `${widgetHeight}px`)
        return wEl
    }
}