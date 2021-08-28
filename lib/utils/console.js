const chalk = require('chalk')

function wrapEmptyLine(fn) {
  return function(...args) {
    console.log()
    fn(...args)
    console.log()
  }
}

exports.error = wrapEmptyLine((msg, title = '') => {
  console.log(chalk.bgRed(`[ERROR ${title}]:\n`))
  console.log(`   ` + chalk.red(msg))
})

exports.success = wrapEmptyLine((msg, title = '') => {
  console.log(chalk.bgGreen(`[SUCCESS ${title}]:\n`))
  console.log(`   ` + chalk.green(msg))
})

exports.done = wrapEmptyLine((msg) => {
  console.log(chalk.bgGreen(`DONE`))
  if (msg) console.log(`   ` + chalk.green(msg))
})

exports.log = wrapEmptyLine((msg) => {
  console.log(chalk.cyan(msg))
})

exports.warn = wrapEmptyLine((msg, title = '') => {
  console.log(chalk.bgYellow(`[WARNING ${title}]:\n`))
  console.log(`   ` + chalk.yellow(msg))
})
