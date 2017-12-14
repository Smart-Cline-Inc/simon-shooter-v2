var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var frequency = 0

function getTone(tone) {
  if (tone == (-500)) {
    frequency = 98*2
    playTone(frequency)
  } else if (tone == (-175 )) {
    frequency = 116.54*2
    playTone(frequency)
  } else if (tone == 175) {
    frequency = 146.83*2
    playTone(frequency)
  } else {
    frequency = 196*2
    playTone(frequency)
  }
}

function playTone(frequency) {
  let time = audioCtx.currentTime
  let gainNode = audioCtx.createGain()
  gainNode.gain.value = 0
  gainNode.connect(audioCtx.destination)

  let oscillator = audioCtx.createOscillator()
  oscillator.connect(gainNode)
  oscillator.type = "sawtooth"
  oscillator.attackTime = 0.01
  oscillator.releaseTime = 0.39

  oscillator.frequency.value = frequency

  // make a sound
  oscillator.start();
  // attack
  gainNode.gain.linearRampToValueAtTime(1.0, time + 0.05);
  // decay
  gainNode.gain.exponentialRampToValueAtTime(0.2, time + 0.1);
  // sustain
  gainNode.gain.linearRampToValueAtTime(1.0, time + 0.2);
  // release
  gainNode.gain.exponentialRampToValueAtTime(0.2, time + 0.2);
  // stop
  oscillator.stop(time + 0.3)
}

function shotSound() {
  let time = audioCtx.currentTime
  let gainNode = audioCtx.createGain()
  gainNode.gain.value = 0.3
  gainNode.connect(audioCtx.destination)
  let oscillator = audioCtx.createOscillator()
  oscillator.connect(gainNode)
  oscillator.type = "sine"
  oscillator.attackTime = 0.01
  oscillator.releaseTime = 0.39
  oscillator.frequency.value = 1600
  oscillator.start()
  oscillator.frequency.linearRampToValueAtTime(80, time + 0.275)
  oscillator.stop(time + 0.3)
}

function impact() {
  for (var i = 0; i < 10; i++) {
    let time = audioCtx.currentTime
    let gainNode = audioCtx.createGain()
    gainNode.gain.value = 0.5
    gainNode.connect(audioCtx.destination)
    let oscillator = audioCtx.createOscillator()
    oscillator.connect(gainNode)
    oscillator.type = "sawtooth"
    oscillator.attackTime = 0.01
    oscillator.releaseTime = 0.39
    oscillator.frequency.value = 49
    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    oscillator.stop(time + 0.15)
  }
}

function loserSound() {
  let time = audioCtx.currentTime
  let gainNode = audioCtx.createGain()
  gainNode.gain.value = 0.8
  gainNode.connect(audioCtx.destination)
  let oscillator = audioCtx.createOscillator()
  oscillator.connect(gainNode)
  oscillator.type = "sawtooth"
  oscillator.attackTime = 0.01
  oscillator.releaseTime = 1.0
  oscillator.frequency.value = 53
  oscillator.start()
  oscillator.stop(time + 1.0)
}
