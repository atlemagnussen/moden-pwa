import {LitElement, html, css} from "lit"
import {customElement, query} from "lit/decorators.js"

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
            outline: 1px solid black;
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

    color = "#004cff"
    lineWidth = 9

    colorChange(e: Event) {
        const target = e.target as HTMLInputElement
        this.color = target.value
    }
    lineWidthChange(e: Event) {
        const target = e.target as HTMLInputElement
        this.lineWidth = parseInt(target.value)
    }
    uploadImage(e: Event) {
        const target = e.target as HTMLInputElement
        if (!target.files || target.files.length == 0)
            return 
        const file = target.files[0]

        const image = new Image()
        image.onload = () => {
            if (this.context)
                this.context.drawImage(image, 0, 0)
        }
        const reader = new FileReader()
        reader.addEventListener("load",() => {
            image.src = reader.result as string
        }, false)

        reader.readAsDataURL(file)
    }

    @query("section")
    sectionEl: HTMLDivElement | undefined

    @query("canvas")
    canvasEl: HTMLCanvasElement | undefined

    context: CanvasRenderingContext2D | null = null
    render() {
        return html`
            <menu>
                <input type="color" placeholder="enter hex color" @input=${this.colorChange} value="${this.color}">
                <input type="range" min="1" max="50" value="${this.lineWidth}" @input=${this.lineWidthChange}>
                <button @click=${this.clearCanvas}>clear</button>
                <!-- <input type="file" name="filename" accept="image/*" @change=${this.uploadImage}> -->
            </menu>
            
            <section @mousemove=${this.mouseMove} @mousedown=${this.setMousePosition} @mouseenter=${this.setMousePosition}>
                <canvas @touchstart=${this.touchstart}
                    @touchmove=${this.touchMove}
                    @touchend=${this.touchEnd}
                    @touchcancel=${this.touchCancel}>
                </canvas>
            </section>
        `
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
        // this.context.fillStyle = "#FFFFFF"
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
        const context = this.context
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const color = this.color
            const touch = touches[i]
            const idx = this.findOngoingTouchIndexById(touch.identifier)
            if (idx === null || idx === undefined || idx < 0)
                continue

            const ongoingTouch = this.ongoingTouches[idx]
            context.beginPath()
            context.moveTo(ongoingTouch.clientX - this.offsetX, ongoingTouch.clientY - this.offsetY)
            context.lineTo(touch.clientX - this.offsetX, touch.clientY - this.offsetY)
            context.lineWidth = this.lineWidth
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
        const context = this.context
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i]
            const idx = this.findOngoingTouchIndexById(touch.identifier)
            if (idx !== null && idx !== undefined && idx >= 0) {
                context.lineWidth = this.lineWidth
                context.fillStyle = this.color
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
    
        this.context.beginPath()
        this.context.lineWidth = this.lineWidth
        this.context.lineCap = "round"
        this.context.strokeStyle = this.color
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