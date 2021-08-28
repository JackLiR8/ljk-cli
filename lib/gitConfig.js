const { exit, error, log, done, chalk, execa } = require('./utils/index.js')
const Listr = require('listr')

async function gitConfig(options) {
  // if both username and email are not provided, then use my github account
  if (!options.username && !options.email) {
    options.username = 'JackLiR8',
    options.email = 'jiakeli1024@gmail.com'
    log('both username and email are not provided, so default username and email are used')
  }

  const tasks = new Listr([
    {
      title: 'Config user.name',
      enabled: ctx => !!ctx.username,
      task: ctx => {
        return ctx.global
          ? execa('git', ['config', '-g', 'user.name', ctx.username])
          : execa('git', ['config', 'user.name', ctx.username])
      }
    },
    {
      title: 'Config user.email',
      enabled: ctx => !!ctx.email,
      task: ctx => {
        return ctx.global
          ? execa('git', ['config', '-g', 'user.email', ctx.email])
          : execa('git', ['config', 'user.email', ctx.email])
      }
    }
  ])

  return tasks.run({...options})
}

module.exports = (...args) => {
  return gitConfig(...args).catch(err => {
    error(err)
    exit(1)
  })
}
