let playerAction = process.argv[process.argv.length - 1];
const game = require('./lib');


process.stdin.on('data', e => {
  const playerAction = e.toString().trim();
  const result = game(playerAction);
  console.log(result);
})