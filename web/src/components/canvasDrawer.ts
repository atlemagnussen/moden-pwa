import {LitElement, html, css} from "lit"
import {customElement, query} from "lit/decorators.js"
import { getConfig, getTouchColor, clear } from "@app/services/drawConfig"
import { Subscription } from "rxjs"

interface PartialTouch {
    identifier: number
    clientX: number
    clientY: number
}

@customElement('canvas-drawer')
export class CanvasDrawer extends LitElement {
    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
        }
        menu {
            flex: 2rem 0 0;
        }
        section {
            flex: auto 1 1;
        }
        canvas {
            background: black;
        }
    `

    subs: Subscription[] = []

    @query("section")
    sectionEl: HTMLDivElement | undefined

    @query("canvas")
    canvasEl: HTMLCanvasElement | undefined

    context: CanvasRenderingContext2D | null = null
    render() {
        return html`
            <section @mousemove=${this.mouseMove} @mousedown=${this.setMousePosition} @mouseenter=${this.setMousePosition}>
                <canvas @touchstart=${this.touchstart}
                    @touchmove=${this.touchMove}
                    @touchend=${this.touchEnd}
                    @touchcancel=${this.touchCancel}>
                </canvas>
            </section>
        `
    }
    connectedCallback(): void {
        super.connectedCallback()
        this.subs.push(clear.subscribe(() => {
            this.clearCanvas()
        }))
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        this.subs.map(s => s.unsubscribe())
    }
    protected firstUpdated(): void {
        if (!this.canvasEl)
            return
        this.setSize()
        this.context = this.canvasEl.getContext("2d")
        this.setBackground()
    }

    setBackground() {
        if (!this.context || !this.sectionEl)
            return
        const config = getConfig()
        if (!config.darkTheme)
            this.context.fillStyle = "#FFFFFF"
        this.context.fillRect(0, 0, this.sectionEl.clientWidth, this.sectionEl.clientHeight);
    }
    setSize() {
        if (!this.canvasEl || !this.sectionEl)
            return
        this.canvasEl.width = this.sectionEl.clientWidth
        this.canvasEl.height = this.sectionEl.clientHeight
    }
    clearCanvas() {
        if (!this.context)
            return
        this.setSize()
        // this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.setBackground()
    }
    ongoingTouches: PartialTouch[] = []
    copyTouch(t: Touch): PartialTouch {
        return {
            identifier: t.identifier,
            clientX: t.clientX,
            clientY: t.clientY
        }
    }
    findOngoingTouchIndexById(id: number) {
        if (this.ongoingTouches.length == 0)
            return null

        const index = this.ongoingTouches.findIndex(ot => ot.identifier == id)
        return index
    }
    offsetX = 0
    offsetY = 0
    touchstart(e: TouchEvent) {
        e.preventDefault()
        if (!this.canvasEl)
            return
        const canvas = this.canvasEl
        const touches = e.changedTouches
        this.offsetX = canvas.getBoundingClientRect().left
        this.offsetY = canvas.getBoundingClientRect().top;
        console.log(`offsetX=${this.offsetX}, offsetY=${this.offsetY}`)
        for (let i = 0; i < touches.length; i++) {
            this.ongoingTouches.push(this.copyTouch(touches[i]))
        }
    }
    touchMove(e: TouchEvent) {
        e.preventDefault()
        if (!this.context)
            return
        const config = getConfig()
        const context = this.context
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i]
            const idx = this.findOngoingTouchIndexById(touch.identifier)
            if (idx === null || idx === undefined || idx < 0)
                continue

            const color = getTouchColor(idx)
            const ongoingTouch = this.ongoingTouches[idx]
            context.beginPath()
            context.moveTo(ongoingTouch.clientX - this.offsetX, ongoingTouch.clientY - this.offsetY)
            context.lineTo(touch.clientX - this.offsetX, touch.clientY - this.offsetY)
            context.lineWidth = config.lineWidth
            context.strokeStyle = color
            context.lineJoin = "round"
            context.closePath()
            context.stroke()
            this.ongoingTouches.splice(idx, 1, this.copyTouch(touch))
        }
    }
    touchEnd(e: TouchEvent) {
        e.preventDefault()
        if (!this.context)
            return
        const config = getConfig()
        const context = this.context
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i]
            const idx = this.findOngoingTouchIndexById(touch.identifier)
            if (idx !== null && idx !== undefined && idx >= 0) {
                context.lineWidth = config.lineWidth
                context.fillStyle = getTouchColor(idx)
                this.ongoingTouches.splice(idx, 1)
            }
        }
    }

    touchCancel(e: TouchEvent) {
        e.preventDefault()
        const touches = e.changedTouches
        for (let i = 0; i < touches.length; i++) {
            let idx = this.findOngoingTouchIndexById(touches[i].identifier)
            if (idx !== null && idx !== undefined && idx <= 0)
                this.ongoingTouches.splice(idx, 1)
        }
    }
    mouseMove(e: MouseEvent) {
        if (e.buttons !== 1 || !this.context)
            return
    
        const config = getConfig()
        this.context.beginPath()
        this.context.lineWidth = config.lineWidth
        this.context.lineCap = "round"
        this.context.strokeStyle = getTouchColor(0)
        this.context.moveTo(this.pos.x, this.pos.y)
        this.setMousePosition(e)
        this.context.lineTo(this.pos.x, this.pos.y)
        this.context.stroke()
    }

    pos = {x: 0, y: 0}
    setMousePosition(e: MouseEvent) {
        this.pos.x = e.offsetX
        this.pos.y = e.offsetY
    }
}
