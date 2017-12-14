var api = "https://galvanize-leader-board.herokuapp.com/api/v1/leader-board/";

var scores = document.getElementsByClassName('scores')[0];

function getSimonShooterScores() {
  fetch(api + 'SimonShooter')
  .then(result => {
    return result.json();
  })
  .then(data => {
    makeScores(data);
  });
};
getSimonShooterScores();

function makeScores(data) {
  var scoresList = [];
  for (var i = 0; i < data.length; i++) {
    scoresList.push([data[i].score, data[i].player_name]);
  };
  scoresList.sort(function(a, b){
    return a[0]-b[0]
  }).reverse();
  putScores(scoresList);
};

function putScores(list) {
  for (var i = 0; i < 10; i++) {
    var pName = document.createElement('p');
    pName.innerHTML = list[i][1];
    var pScore = document.createElement('p');
    pScore.innerHTML = list[i][0];
    var scoreDiv = document.createElement('div');
    scoreDiv.setAttribute('class', 'score');
    scoreDiv.appendChild(pName);
    scoreDiv.appendChild(pScore);
    scores.appendChild(scoreDiv);
  };
};
