
const program = require('commander');
 
// program
//   .option('preview', 'output extra debugging')
//   .option('publish', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');
 
// // program.parse(process.argv);
 
// if (program.debug) console.log(program.opts());
// console.log('pizza details:');
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);

// program
//   .command('preview [env]')
//   .action(function (cmd, env) {
//     // console.log('====cmd====', cmd);
//     console.log('====env====', env);


//   });
 
// program.parse(process.argv);
 
// if (typeof cmdValue === 'undefined') {
//   console.error('no command given!');
//   process.exit(1);
// }
// console.log('command:', cmdValue);
// console.log('environment:', envValue || "no environment given");
// console.log('address:', addressValue);

program
  .option('-p, --prod', '正式环境')
  .option('-d, --dev', '测试环境')
  .option(',--chooice', '选项');

program.parse(process.argv);

if (program.prod) console.log(program.opts(), '正式环境');
if (program.dev) console.log('测试环境');
if (program.chooice) console.log('可以选择');