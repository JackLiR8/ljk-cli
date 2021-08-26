const { exit, error, log, done, chalk, execa } = require('./utils/index.js')
const Listr = require('listr')

function mergeBranch(fromBranch, toBranch) {
  const tasks = new Listr([
    {
      title: `Checkout to ${toBranch}`,
      task: () => execa('git', ['checkout', toBranch])
    },
    // {
    //   title: "Check remote history",
    //   task: (ctx, task) =>
    //     execa("git", [
    //       "rev-list",
    //       "--count",
    //       "--left-only",
    //       "@{u}...HEAD",
    //     ])
    //     .then(res => {
    //       console.log('检查remote', res)
    //       if (res.stdout !== "0") {
    //         ctx.isRemoteDiff = true
    //       }
    //     }),
    // },
    {
      title: 'Pull',
      // skip: ctx => !ctx.isRemoteDiff && 'Remote has not changed',
      task: () => execa('git', ['pull']).then(res => {
        log(chalk.green('拉取\n', res))
        if (res.stdout) {
          // TODO
        }
      })
    },
    {
      title: 'Merge',
      task: () => execa('git', ['merge', fromBranch]).then(res => {
        // console.log(chalk.green('合并\n'), res)
      })
    },
    {
      title: 'Push',
      task: () => execa('git', ['push']).then(res => {
        // console.log(chalk.green('推送'), res)
      })
    }
  ])

  return {
    title: `Merge '${fromBranch}' to '${toBranch}'`,
    task: () => tasks
  }
}

function getMergeTasks(branches) {
  let tasks = []
  for (let i = 1; i < branches.length; i++) {
    tasks.push(mergeBranch(branches[i - 1], branches[i]))
  }

  return tasks
}

async function mergeflow(options) {
  const branches = [...options.branches]
  console.log('MERGE FLOW branches', branches)
  const mergeTasks = getMergeTasks(branches)
  const tasks = new Listr([
    {
      title: "Check Git Status",
      task: () =>
        execa("git", ["status", "--porcelain"]).then(res => {
          if (res.stdout !== "") {
            throw new Error(
              "Unclean working tree. Commit or stash changes first"
            );
          }
        }),
    },
    ...mergeTasks,
  ])

  return tasks.run()
}

module.exports = (...args) => {
  return mergeflow(...args).catch(err => {
    error(err)
    exit(1)
  })
}
