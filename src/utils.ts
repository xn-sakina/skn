import execa, { Options } from 'execa'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import readPkgUp from 'read-pkg-up'

const EXECA_OPTIONS: Options = {
  shell: true,
  stdio: 'inherit',
  encoding: 'utf-8',
}

export const log = (content: string) => {
  console.log(`${chalk.bold.yellow('[skn]')}: ${chalk.blue(content)}`)
}

export const DEBUG_MARK = '-!'

export const exec = async (cmd: string, argv: string[] = []) => {
  const debugMarkIdx = argv.indexOf(DEBUG_MARK)
  if (~debugMarkIdx) {
    argv.splice(debugMarkIdx, 1)
    log([cmd, ...argv].join(' '))
    return
  }
  try {
    await execa(cmd, argv, EXECA_OPTIONS)
  } catch (e) {}
}

export interface IFindFileResult {
  isExist: boolean
  scripts: string[]
  pkgPath?: string
}
export const findFile = async (filename: string): Promise<IFindFileResult> => {
  const NOT_RESULT: IFindFileResult = { isExist: false, scripts: [] }
  const pkgInfo = await readPkgUp({
    cwd: process.cwd(),
  })
  if (!pkgInfo) {
    return NOT_RESULT
  }
  const pkgPath = pkgInfo?.path
  if (!fs.existsSync(pkgPath)) {
    return NOT_RESULT
  }
  // 检查同级文件夹
  const targetFilePath = path.resolve(path.dirname(pkgPath), filename)
  if (!fs.existsSync(targetFilePath)) {
    return NOT_RESULT
  }
  const pkg = fs.readJsonSync(pkgPath)
  const scriptsObj = pkg?.scripts || {}
  return {
    isExist: true,
    scripts: Object.keys(scriptsObj),
    pkgPath,
  }
}
