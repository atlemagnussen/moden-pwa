import { Signal } from "signal-polyfill"

const test = new Signal.State(0)

const test2 = new Signal.Computed(() => test.get() * 2)
