[
  'exit',
  'console',
].forEach(m => {
  Object.assign(exports, require(`./${m}`))
})

exports.chalk = require('chalk')
exports.execa = require('execa')
