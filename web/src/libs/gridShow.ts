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
    options: GridShowOptions

    /**
     * opts
     */
    constructor(opts: GridShowOptions) {
        this.options = opts
    }

    createWidgetEl(widget: GridShowWidget) {
        const wEl = document.createElement("div")

        wEl.setAttribute("gs-x", widget.x.toString())
        wEl.setAttribute("gs-y", widget.y.toString())
        wEl.setAttribute("gs-w", widget.w.toString())
        wEl.setAttribute("gs-h", widget.h.toString())
        return wEl
    }
}