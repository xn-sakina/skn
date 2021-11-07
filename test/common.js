const { run } = require('../dist')
const chalk = require('chalk')

const log = (content) => {
  return `${chalk.bold.yellow('[skn]')}: ${chalk.blue(content)}`
}
console.log = jest.fn()

const ep = (cmd, result, isNpx = false) => {
  run({
    originArgv: [...cmd.split(' '), '-!'],
    isNpx,
  })
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result = log(result)
      expect(console.log).toHaveBeenLastCalledWith(result)
      resolve()
    }, 500)
  })
}

module.exports = {
  ep,
}
