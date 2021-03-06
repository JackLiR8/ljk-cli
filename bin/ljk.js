#!/usr/bin/env node

const chalk = require('chalk')
const minimist = require('minimist')
const { Command } = require('commander')

const program = new Command()
program.version(`ljk ${require('../package.json').version}`)

program
  .command('mergeflow')
  .description('merge git branch automatically')
  .requiredOption(
    '-b, --branches <branches...>',
    'branches that will be merged form left to right in a row'
  )
  .option('-r, --return, return to first branch after merge flow')
  .action((options) => {
    require('../lib/mergeflow.js')(options)
  })

program
  .command('gitConfig')
  .description('config username and email for git')
  .option('-n, --username <name>', 'user.name')
  .option('-e, --email <email>', 'user.email')
  .option('-g, --global', 'config git globally')
  .action(options => {
    require('../lib/gitConfig.js')(options)
  })

program.parse(process.argv)

