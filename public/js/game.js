let arr = [];

function pickRandomSphere() {
  arr.push(Math.floor(Math.random() * 4 + 1))
  playerChoiceArr = []
}

function lightUpSphere(difficulty, click) {
  pickRandomSphere()
  for (i=0; i < arr.length; i++) {
    setTimeout(chooseSphere, i * 1000 - difficulty * i * 40, i, difficulty, click)
  }
}

function chooseSphere(i, difficulty, click) {
  if (arr[i] === 1) {
    setTimeout(lighting1, 150)
    getTone(-500)
  } else if (arr[i] === 2) {
    setTimeout(lighting2, 150)
    getTone(-175)
  } else if (arr[i] === 3) {
    setTimeout(lighting3, 150)
    getTone(175)
  } else if (arr[i] === 4) {
    setTimeout(lighting4, 150)
    getTone(500)
  }
  setTimeout(revertBack, 400 - difficulty * 5)
}

function lighting1() {
  var w = material1.color.setHex(0xFFFFFF)
  return w
}

function lighting2() {
  var x = material2.color.setHex(0xFFFFFF)
  return x
}

function lighting3() {
  var y = material3.color.setHex(0xFFFFFF)
  return y
}

function lighting4() {
  var z = material4.color.setHex(0xFFFFFF)
  return z
}

function revertBack() {
  material1.color.setHex(0x00FF00);
  material2.color.setHex(0x0000FF);
  material3.color.setHex(0xFF0000);
  material4.color.setHex(0xFFFF00);
}
