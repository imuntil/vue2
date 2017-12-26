window.AudioContext = window.AudioContext || window.webkitAudioContext
// let nfAble

// const audioCtx = new AudioContext()
// const arrFrenquency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]
// let start = 0
// let direction = 1
// export function run () {
//   let frequency = arrFrenquency[start]
//   if (!frequency) {
//     direction -= -1 * direction
//     start = start + 2 * direction
//     frequency = arrFrenquency[start]
//   }
//   start = start + direction
//   const oscillator = audioCtx.createOscillator()
//   const gainNode = audioCtx.createGain()
//   oscillator.connect(gainNode)
//   gainNode.connect(audioCtx.destination)
//   oscillator.type = 'sine'
//   oscillator.frequency.value = frequency
//   gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
//   gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01)
//   oscillator.start(audioCtx.currentTime)
//   gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1)
//   oscillator.stop(audioCtx.currentTime + 1)
// }

export class AudioCtx {
  static run () {
    if (!AudioCtx.audioCtx) return
    let frequency = AudioCtx.arrFrenquency[AudioCtx.start]
    if (!frequency) {
      AudioCtx.direction -= -1 * AudioCtx.direction
      AudioCtx.start = AudioCtx.start + 2 * AudioCtx.direction
      AudioCtx.frequency = AudioCtx.arrFrenquency[AudioCtx.start]
    }
    AudioCtx.start = AudioCtx.start + AudioCtx.direction
    const oscillator = AudioCtx.audioCtx.createOscillator()
    const gainNode = AudioCtx.audioCtx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(AudioCtx.audioCtx.destination)
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gainNode.gain.setValueAtTime(0, AudioCtx.audioCtx.currentTime)
    gainNode.gain.linearRampToValueAtTime(1, AudioCtx.audioCtx.currentTime + 0.01)
    oscillator.start(AudioCtx.audioCtx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, AudioCtx.audioCtx.currentTime + 1)
    oscillator.stop(AudioCtx.audioCtx.currentTime + 1)
  }
}
AudioCtx.audioCtx = AudioContext ? new AudioContext() : ''
AudioCtx.arrFrenquency = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]
AudioCtx.start = 0
AudioCtx.direction = 1
