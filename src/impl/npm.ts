import { PkgCore } from './core'
import { npm, npx } from '../base'

const NPM_KEYWORD = {
  install: 'i',
  global: '-g',
  uninstll: 'uninstall',
  run: 'run',
}

export class NpmImpl implements PkgCore {
  constructor() {}

  installDeps(argv: string[]) {
    npm([NPM_KEYWORD.install, ...argv])
  }

  globalHandler(argv: string[]) {
    return [NPM_KEYWORD.global, ...argv]
  }

  addDep(argv: string[], isGlobal: boolean = false) {
    if (isGlobal) {
      argv = this.globalHandler(argv)
    }
    npm([NPM_KEYWORD.install, ...argv])
  }

  removeDep(argv: string[], isGlobal: boolean = false) {
    if (isGlobal) {
      argv = this.globalHandler(argv)
    }
    npm([NPM_KEYWORD.uninstll, ...argv])
  }

  runScript(argv: string[]) {
    npm([NPM_KEYWORD.run, ...argv])
  }

  dlxCmd(argv: string[]) {
    npx(argv)
  }

  degradeCmd(argv: string[]) {
    npm(argv)
  }
}
