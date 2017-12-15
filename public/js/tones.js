var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var frequency = 0

function getTone(tone) {
  if (tone == (-500)) {
    frequency = 196/2
    playTone(frequency)
  } else if (tone == (-175 )) {
    frequency = 247/2
    playTone(frequency)
  } else if (tone == 175) {
    frequency = 293.66/2
    playTone(frequency)
  } else {
    frequency = 392/2
    playTone(frequency)
  }
}

function playTone(frequency) {
  for (var i = 0; i < 2; i++) {

    let time = audioCtx.currentTime
    let gainNode = audioCtx.createGain()
    gainNode.gain.value = 0.5
    gainNode.connect(audioCtx.destination)

    let oscillator = audioCtx.createOscillator()
    oscillator.connect(gainNode)
    oscillator.type = "sawtooth"
    oscillator.attackTime = 0.01
    oscillator.releaseTime = 0.39

    if (i == 1) {
      oscillator.frequency.value = frequency
    }
    oscillator.frequency.value = frequency * 2 + frequency * 0.05
    let dip = frequency - frequency*.1
    let dip2 = frequency*2 - frequency*0.01

    // make a sound
    oscillator.start();
    // attack
    gainNode.gain.linearRampToValueAtTime(0.5, time + 0.05);
    if (i == 0) {
    oscillator.frequency.linearRampToValueAtTime(dip, time + 0.05)
    } else {
      // oscillator.frequency.linearRampToValueAtTime(dip2, time + 0.05)
    }
    // decay
    gainNode.gain.exponentialRampToValueAtTime(0.1, time + 0.1);
    if (i == 0) {
      oscillator.frequency.linearRampToValueAtTime(frequency, time + 0.1)
    } else {
      oscillator.frequency.linearRampToValueAtTime(frequency*2, time + 0.1)
    }
    // sustain
    gainNode.gain.linearRampToValueAtTime(0.5, time + 0.2);
    // release
    gainNode.gain.exponentialRampToValueAtTime(0.1, time + 0.2);
    // stop
    oscillator.stop(time + 0.2)
  }
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
    gainNode.gain.value = 0.1
    gainNode.connect(audioCtx.destination)
    let oscillator = audioCtx.createOscillator()
    oscillator.connect(gainNode)
    oscillator.type = "square"
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
  gainNode.gain.value = 0.4
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
