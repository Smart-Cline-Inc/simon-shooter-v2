const body = document.querySelector('body');
var canvas = document.getElementById('game-display')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: false
});

var width = window.innerWidth
var height = width/16*9
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x6D6D6D, 0.3);
renderer.setSize(width, height);

window.addEventListener('resize', () => {
  var resizeWidth = window.innerWidth
  var resizeHeight = resizeWidth/16*9
  renderer.setSize(resizeWidth, resizeHeight)
})

const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 3000);

const scene = new THREE.Scene();

// const light1 = new THREE.AmbientLight(0xffffff, 1);
// light1.position.x = 0;
// light1.position.y = 1500;
// light1.position.z = -1500;
// scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 0.75);
light2.position.x = 0;
light2.position.y = -1500;
light2.position.z = 1500;
scene.add(light2)

const light3 = new THREE.AmbientLight(0xffffff, 0.2);
light3.position.x = 0
light3.position.y = 0
light3.position.z = 0
scene.add(light3)



let objects = [];

const sphere1 = new THREE.SphereGeometry(75, 100, 100);
const sphere2 = new THREE.SphereGeometry(75, 100, 100);
const sphere3 = new THREE.SphereGeometry(75, 100, 100);
const sphere4 = new THREE.SphereGeometry(75, 100, 100);
const shooter = new THREE.ConeGeometry(20, 100, 3);
const shot = new THREE.IcosahedronGeometry(1, 0);

const material1 = new THREE.MeshLambertMaterial({
  color: 0x00BB00
});
const material2 = new THREE.MeshLambertMaterial({
  color: 0x0000FF
});
const material3 = new THREE.MeshLambertMaterial({
  color: 0xFF0000
});
const material4 = new THREE.MeshLambertMaterial({
  color: 0xBBBB00
});
const material5 = new THREE.MeshLambertMaterial({
  color: 0xFF00FF
});
const material6 = new THREE.MeshLambertMaterial({
  color: 0xFF55FF
});

const mesh1 = new THREE.Mesh(sphere1, material1);
const mesh2 = new THREE.Mesh(sphere2, material2);
const mesh3 = new THREE.Mesh(sphere3, material3);
const mesh4 = new THREE.Mesh(sphere4, material4);
const mesh5 = new THREE.Mesh(shooter, material5);
const mesh6 = new THREE.Mesh(shot, material6);

mesh1.position.x = -500;
mesh1.position.y = 50;
mesh1.position.z = -1000;

mesh2.position.x = -175;
mesh2.position.y = 175;
mesh2.position.z = -1000;

mesh3.position.x = 175;
mesh3.position.y = 175;
mesh3.position.z = -1000;

mesh4.position.x = 500;
mesh4.position.y = 50;
mesh4.position.z = -1000;

mesh5.position.x = 0;
mesh5.position.y = -65;
mesh5.position.z = -500;
mesh5.rotation.x = 75;
mesh5.rotation.y = 0;
mesh5.rotation.z = 0;

mesh6.position.x = 0;
mesh6.position.y = -65;
mesh6.position.z = -500;

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
scene.add(mesh4);
scene.add(mesh5);
scene.add(mesh6);

objects.push(mesh1);
objects.push(mesh2);
objects.push(mesh3);
objects.push(mesh4);

var loader = new THREE.FontLoader()
loader.load( 'js/ps2p.json', function ( font ) {

	var simonShooter = new THREE.TextGeometry( 'Simon     Shooter', {
		font: font,
		size: 40,
		height: 40,
		curveSegments: 12
	} );
	const material7 = new THREE.MeshLambertMaterial({color: 0x00FF00});

	const mesh7 = new THREE.Mesh(simonShooter, material7);
	mesh7.position.x = -440;
	mesh7.position.y = -150;
	mesh7.position.z = -1300;
	mesh7.rotation.x = -06;
	mesh7.rotation.y = 0;
	mesh7.rotation.z = 0;
	scene.add(mesh7);

	// var quaternion = new THREE.Quaternion();
	// quaternion.setFromAxisAngle(axis, 0.9);
	// mesh7.position.applyQuaternion(quaternion);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const scoreElement = document.querySelector('.score');
const roundElement = document.querySelector('.round');
let score = 0;
let round = 1;
let playerChoiceArr = [];

function start() {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mousedown', onMouseDown);
  let pElement = document.createElement('p');
  pElement.innerText = "Press spacebar to start";
  body.append(pElement);
  document.addEventListener('keyup', onSpacePress, false);
}

function onSpacePress(event) {
	event.preventDefault();
	if (event.code == 'Space') {
		score = 0;
		round = 1;
		scoreElement.innerText = 'Score: ' + score;
		roundElement.innerText = 'Round: ' + round;
		let startText = document.querySelector('p')
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('mousedown', onMouseDown, false);
		body.removeChild(startText);
		lightUpSphere(round-1);
		document.removeEventListener('keyup', onSpacePress)
	};
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  mesh5.rotation.z = -mouse.x * 1.5;
};

function onMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    let spherePosition = intersects[0].object.position.x;
    addSphereToArray(spherePosition);
    setTimeout(light, 275, intersects)
    setTimeout(impact, 275);
    setTimeout(revertBack, 575);
    shoot(intersects);
    shotSound();
    compareArrays(spherePosition);
  };
};

function light(intersects) {
  let shine = intersects[0].object.material.color.setHex(0xFFFFFF);
  return shine
}

function clickLight() {
  intersects[0].object.material.color.setHex(0xFF69B4);
  setTimeout(revertBack, 300);
}

function addSphereToArray(spherePos) {
  switch (spherePos) {
    case -500:
      playerChoiceArr.push(1);
      break;
    case -175:
      playerChoiceArr.push(2);
      break;
    case 175:
      playerChoiceArr.push(3);
      break;
    case 500:
      playerChoiceArr.push(4);
      break;
  };
};

function compareArrays(spherePosition) {
	for (i=0; i < playerChoiceArr.length; i++) {
		if ((playerChoiceArr[i] !== arr[i]) || (playerChoiceArr.length === arr.length && playerChoiceArr[playerChoiceArr.length-1] !== arr[arr.length-1])) {
			playerChoiceArr = [];
			arr = [];
			setTimeout(loserSound, 275);
			setTimeout(postScore, 400, score);
			setTimeout(start, 1200);
			break;
		} else if ((i === playerChoiceArr.length-1) && (playerChoiceArr[i] === arr[i]) && playerChoiceArr.length < arr.length) {
			score += 50;
			scoreElement.innerText = 'Score: ' + score;
			setTimeout(getTone, 275, spherePosition);
			// i++;
		} else if (playerChoiceArr[i] === arr[i] && playerChoiceArr.length === arr.length) {
			score += 50;
			round++;
			scoreElement.innerText = 'Score: ' + score;
			setTimeout(getTone, 275, spherePosition);
			setTimeout(incrementRound, 1500)
			setTimeout(lightUpSphere, 1500, round-2, 275);
			break;
		};
	};
};

function incrementRound() {
  roundElement.innerText = 'Round: ' + round;
}

function shoot(intersects) {
  let posX = intersects["0"].point.x;
  let posY = intersects["0"].point.y;
  let posZ = intersects["0"].point.z;
  let target = {
    x: posX,
    y: posY,
    z: posZ
  };
  let size = {
    x: 40,
    y: 40,
    z: 40
  }
  var tween = new TWEEN.Tween(mesh6.position)
    .to(target, 275)
    .start()
  var tween2 = new TWEEN.Tween(mesh6.scale)
    .to(size, 275)
    .start()
  var tween3 = new TWEEN.Tween(light2.position)
    .to({
      x: posX*1.03,
      y: posY*1.02,
      z: (posZ + 100)
    }, 275)
    .start()
  var tween4 = new TWEEN.Tween(light2)
    .to({
      intensity: 1
    }, 275)
    .start()
    setTimeout(revertLight, 450)
    setTimeout(revertShot, 340)
};

function revertLight() {
  var tween5 = new TWEEN.Tween(light2.position)
    .to({
      x: 0,
      y: -1500,
      z: 1500
    }, 100)
    .start()
  var tween6 = new TWEEN.Tween(light2)
    .to({
      intensity: 0.75
    }, 100)
    .start()
}

function revertShot() {
  mesh6.scale.x = 0.1;
  mesh6.scale.y = 0.1;
  mesh6.scale.z = 0.1;
  mesh6.position.x = 0;
  mesh6.position.y = -65;
  mesh6.position.z = -500;
}

function postScore(num) {
  var gamerName = prompt("Please enter your name to save your score!");
  if (gamerName != null) {
    $.ajax({
      type: "POST",
      url: api,
      data: {
        "game_name": "SimonShooter",
        "player_name": gamerName,
        "score": num
      }
    });
  };
};


function animate() {
  TWEEN.update();
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};



requestAnimationFrame(animate);
