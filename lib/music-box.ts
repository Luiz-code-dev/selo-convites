const MELODY = [
  523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33,
  523.25, 587.33, 659.25, 783.99, 698.46, 659.25, 587.33, 523.25,
]
const STEP_SECONDS = 0.42

type AudioContextCtor = typeof AudioContext

export class MusicBox {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private timer: ReturnType<typeof setInterval> | null = null
  private step = 0
  private nextTime = 0
  private muted = false

  start() {
    if (typeof window === 'undefined') return
    const Ctor: AudioContextCtor | undefined =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext
    if (!Ctor) return

    if (!this.ctx) {
      this.ctx = new Ctor()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.muted ? 0 : 0.12

      const delay = this.ctx.createDelay()
      delay.delayTime.value = 0.28
      const feedback = this.ctx.createGain()
      feedback.gain.value = 0.28
      delay.connect(feedback).connect(delay)
      this.master.connect(this.ctx.destination)
      this.master.connect(delay).connect(this.ctx.destination)
    }

    void this.ctx.resume()
    if (this.timer) return
    this.nextTime = this.ctx.currentTime + 0.05
    this.timer = setInterval(() => this.schedule(), 100)
  }

  private schedule() {
    if (!this.ctx || !this.master) return
    while (this.nextTime < this.ctx.currentTime + 0.3) {
      this.playNote(MELODY[this.step % MELODY.length], this.nextTime)
      if (this.step % 4 === 0) this.playNote(MELODY[this.step % MELODY.length] / 2, this.nextTime, 0.5)
      this.step += 1
      this.nextTime += STEP_SECONDS
    }
  }

  private playNote(freq: number, time: number, level = 1) {
    if (!this.ctx || !this.master) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, time)
    gain.gain.exponentialRampToValueAtTime(0.6 * level, time + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.4)
    osc.connect(gain).connect(this.master)
    osc.start(time)
    osc.stop(time + 1.5)
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.12, this.ctx.currentTime, 0.05)
    }
  }

  stop() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    this.step = 0
    void this.ctx?.close()
    this.ctx = null
    this.master = null
  }
}
