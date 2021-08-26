const chalk = require('chalk')

exports.error = (msg, title = '') => {
  console.log(chalk.bgRed(`[ERROR ${title}]:\n`))
  console.log(`   ` + chalk.red(msg))
}

exports.success = (msg, title = '') => {
  console.log(chalk.bgGreen(`[SUCCESS ${title}]:\n`))
  console.log(`   ` + chalk.green(msg))
}

exports.done = (msg) => {
  console.log(chalk.bgGreen(`DONE`))
  if (msg) console.log(`   ` + chalk.green(msg))
}

exports.log = (msg) => {
  console.log()
  console.log(chalk.yellow(msg))
  console.log()
}
