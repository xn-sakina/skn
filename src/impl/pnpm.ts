import { PkgCore } from './core'
import { pnpm, pnpx } from '../base'

const PNPM_KEYWORD = {
  add: 'add',
  install: 'i',
  global: '-g',
  uninstll: 'remove',
}

export class PnpmImpl implements PkgCore {
  constructor() {}

  installDeps(argv: string[]) {
    pnpm([PNPM_KEYWORD.install, ...argv])
  }

  globalHandler(argv: string[]) {
    return [PNPM_KEYWORD.global, ...argv]
  }

  addDep(argv: string[], isGlobal: boolean = false) {
    if (isGlobal) {
      argv = this.globalHandler(argv)
    }
    pnpm([PNPM_KEYWORD.add, ...argv])
  }

  removeDep(argv: string[], isGlobal: boolean = false) {
    if (isGlobal) {
      argv = this.globalHandler(argv)
    }
    pnpm([PNPM_KEYWORD.uninstll, ...argv])
  }

  runScript(argv: string[]) {
    pnpm(argv)
  }

  dlxCmd(argv: string[]) {
    pnpx(argv)
  }

  degradeCmd(argv: string[]) {
    pnpm(argv)
  }
}
