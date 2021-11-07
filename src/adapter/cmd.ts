import { isArray, slice, cloneDeep } from 'lodash'

export const COMMON_CMD = {
  install: ['install', 'i'],
  add: ['add'],
  remove: ['remove', 'uninstall'],
  global: {
    mark: '-g',
    prefix: 'global',
  },
  runScript: 'run',
  npx: 'dlx',
}

export interface ICheckResult {
  isPass: boolean
  filteredArgv: string[]
}
const NOT_PASS_CHECK: ICheckResult = {
  isPass: false,
  filteredArgv: [],
}

export const checkInstall = (argv: string[]): ICheckResult => {
  // 1. skn -> []
  if (!argv?.length) {
    return {
      isPass: true,
      filteredArgv: argv,
    }
  }
  // 2.1 skn i -a
  // 2.2 skn install -a -> ['-a']
  const firstCmd = argv?.[0]
  if (!firstCmd) {
    return NOT_PASS_CHECK
  }
  if (COMMON_CMD.install.includes(firstCmd)) {
    return {
      isPass: true,
      filteredArgv: slice(argv, 1),
    }
  }
  return NOT_PASS_CHECK
}

export const checkGlobal = (argv: string[]): ICheckResult => {
  if (!argv || !isArray(argv)) {
    return NOT_PASS_CHECK
  }
  // 1. skn global add lodash -> ['add', 'lodash']
  if (argv?.[0] === COMMON_CMD.global.prefix) {
    return {
      isPass: true,
      filteredArgv: slice(argv, 1),
    }
  }
  // 2. skn add -g lodash -> ['add', 'lodash']
  const globalMarkIdx = argv.findIndex((arg) => arg === COMMON_CMD.global.mark)
  if (~globalMarkIdx) {
    const argvCopy = cloneDeep(argv)
    argvCopy.splice(globalMarkIdx, 1)
    return {
      isPass: true,
      filteredArgv: argvCopy,
    }
  }
  return NOT_PASS_CHECK
}

export const checkRunScripts = (
  argv: string[],
  scripts: string[]
): ICheckResult => {
  if (!argv || !isArray(argv) || !scripts || !isArray(scripts)) {
    return NOT_PASS_CHECK
  }
  const firstCmd = argv?.[0]
  const secondCmd = argv?.[1]
  // 1. skn run dev -> ['dev']
  if (firstCmd === COMMON_CMD.runScript && scripts.includes(secondCmd)) {
    return {
      isPass: true,
      filteredArgv: slice(argv, 1),
    }
  }
  // 2. skn dev -> ['dev']
  if (scripts.includes(firstCmd)) {
    return {
      isPass: true,
      filteredArgv: argv,
    }
  }
  return NOT_PASS_CHECK
}

export const getFirstCmdCheckerOnly =
  (willCheckArr: string[]) => (argv: string[]) => {
    if (!argv || !isArray(argv)) {
      return NOT_PASS_CHECK
    }
    if (willCheckArr.includes(argv?.[0])) {
      return {
        isPass: true,
        filteredArgv: slice(argv, 1),
      }
    }
    return NOT_PASS_CHECK
  }

export const checkAdd = getFirstCmdCheckerOnly(COMMON_CMD.add)

export const checkRemove = getFirstCmdCheckerOnly(COMMON_CMD.remove)

export const checkNpx = (argv: string[]): ICheckResult => {
  if (!argv || !isArray(argv)) {
    return NOT_PASS_CHECK
  }
  if (argv?.[0] === COMMON_CMD.npx) {
    return {
      isPass: true,
      filteredArgv: slice(argv, 1),
    }
  }
  return NOT_PASS_CHECK
}
