module.exports = function (playerActions) {
  let random = Math.random() * 3;

  if (random < 1) {

    var computerActions = 'rock';
  } else if (random > 2) {
    var computerActions = 'scissor';
  } else {
    var computerActions = 'paper';
  }
  console.log('i setout', playerActions, 'you setout', computerActions);
  if (playerActions == computerActions) {
    console.log('equal');
    console.log(0);
  } else if (
    (computerActions == 'rock' && playerActions == 'paper') ||
    (computerActions == 'scissor' && playerActions == 'rock') ||
    (computerActions == 'paper' && playerActions == 'scissor')
  ) {
    console.log('you win');
    console.log(-1);

  } else {
    console.log('you lose');
    console.log(1);

  }
}