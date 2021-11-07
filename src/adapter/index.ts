import { PkgCore } from '../impl/core'
import {
  checkGlobal,
  checkRunScripts,
  checkInstall,
  checkAdd,
  checkRemove,
  checkNpx,
} from './cmd'

export const commandAdapter = ({
  argv = [],
  ins,
  scripts = [],
  isNpx = false,
}: {
  argv: string[]
  ins: PkgCore
  scripts: string[]
  isNpx: boolean
}) => {
  // check npx
  const npxResult = checkNpx(argv)
  if (npxResult.isPass) {
    argv = npxResult.filteredArgv
    isNpx = true
  }
  if (isNpx) {
    ins.dlxCmd(argv)
    return
  }
  // check install
  const installResult = checkInstall(argv)
  if (installResult.isPass) {
    ins.installDeps(installResult.filteredArgv)
    return
  }
  // check scripts
  const runScriptsResult = checkRunScripts(argv, scripts)
  if (runScriptsResult.isPass) {
    ins.runScript(runScriptsResult.filteredArgv)
    return
  }
  // check global
  let isGlobal = false
  const globalResult = checkGlobal(argv)
  if (globalResult.isPass) {
    isGlobal = true
    argv = globalResult.filteredArgv
  }
  // check add
  const addResult = checkAdd(argv)
  if (addResult.isPass) {
    ins.addDep(addResult.filteredArgv, isGlobal)
    return
  }
  // check remove
  const removeResult = checkRemove(argv)
  if (removeResult.isPass) {
    ins.removeDep(removeResult.filteredArgv, isGlobal)
    return
  }
  // degrade
  ins.degradeCmd(argv)
}
