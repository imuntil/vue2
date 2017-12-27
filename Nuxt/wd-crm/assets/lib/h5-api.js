const arrFrenquency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]
let start = 0
let direction = 1

export class AudioCtx {
  constructor () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioCtx = new AudioContext()
  }
  run () {
    let frequency = arrFrenquency[start]
    if (!frequency) {
      direction -= -1 * direction
      start = start + 2 * direction
      frequency = arrFrenquency[start]
    }
    start = start + direction
    const oscillator = this.audioCtx.createOscillator()
    const gainNode = this.audioCtx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(this.audioCtx.destination)
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01)
    oscillator.start(this.audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1)
    oscillator.stop(this.audioCtx.currentTime + 1)
  }
}

let ntAble = null
export function notification (msg) {
  if (ntAble === null) {
    ntAble = ('Notification' in window)
  }
  if (!ntAble) return false
  if (!('Notification' in window)) return
  if (Notification.permission === 'granted') {
    /* eslint-disable no-new */
    new Notification(msg)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        /* eslint-disable no-new */
        new Notification(msg)
      }
    })
  }
}
