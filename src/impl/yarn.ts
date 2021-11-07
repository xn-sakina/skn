import { PkgCore } from './core'
import { yarn } from '../base'

const YARN_KEYWORD = {
  add: 'add',
  global: 'global',
  remove: 'remove',
}

export class YarnImpl implements PkgCore {
  constructor() {}

  installDeps(argv: string[]) {
    yarn(argv)
  }

  addDep(argv: string[], isGlobal: boolean = false) {
    if (isGlobal) {
      yarn([YARN_KEYWORD.global, YARN_KEYWORD.add, ...argv])
      return
    }
    yarn([YARN_KEYWORD.add, ...argv])
  }

  removeDep(argv: string[], isGlobal: boolean = false) {
    if (isGlobal) {
      yarn([YARN_KEYWORD.global, YARN_KEYWORD.remove, ...argv])
      return
    }
    yarn([YARN_KEYWORD.remove, ...argv])
  }

  runScript(argv: string[]) {
    yarn(argv)
  }

  /**
   * @alias degradeCmd
   * not support yarn 2/3
   */
  dlxCmd(argv: string[]) {
    this.degradeCmd(argv)
  }

  degradeCmd(argv: string[]) {
    yarn(argv)
  }
}
