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
    material1.color.setHex(0xFFFFFF)
    getTone(-500)
  } else if (arr[i] === 2) {
    material2.color.setHex(0xFFFFFF)
    getTone(-175)
  } else if (arr[i] === 3) {
    material3.color.setHex(0xFFFFFF)
    getTone(175)
  } else if (arr[i] === 4) {
    material4.color.setHex(0xFFFFFF)
    getTone(500)
  }
  setTimeout(revertBack, 375 - difficulty * 5)
}


function revertBack() {
  material1.color.setHex(0x00BB00);
  material2.color.setHex(0x0000FF);
  material3.color.setHex(0xFF0000);
  material4.color.setHex(0xBBBB00);
}
