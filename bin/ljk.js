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
  .action((options) => {
    require('../lib/mergeflow.js')(options)
  })

program.parse(process.argv)

