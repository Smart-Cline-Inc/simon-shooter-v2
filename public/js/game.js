let arr = [];

function pickRandomSphere() {
  arr.push(Math.floor(Math.random() * 4 + 1))
  playerChoiceArr = []
}

function lightUpSphere(difficulty) {
  pickRandomSphere()
  for (i=0; i < arr.length; i++) {
    setTimeout(chooseSphere, i * 1000 - difficulty * i * 75, i, difficulty)
  }
}

function chooseSphere(i, difficulty) {
  if (arr[i] === 1) {
    material1.color.setHex(0xFFFFFF);
    getTone(-500)
  } else if (arr[i] === 2) {
    material2.color.setHex(0xFFFFFF);
    getTone(-175)
  } else if (arr[i] === 3) {
    material3.color.setHex(0xFFFFFF);
    getTone(175)
  } else if (arr[i] === 4) {
    material4.color.setHex(0xFFFFFF);
    getTone(500)
  }
  setTimeout(revertBack, 800 - difficulty * 60)
}

function revertBack() {
  material1.color.setHex(0x00FF00);
  material2.color.setHex(0x0000FF);
  material3.color.setHex(0xFF0000);
  material4.color.setHex(0xFFFF00);
}
