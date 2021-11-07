export type ExecArgvFun = (argv: string[]) => void
export type ExecArgvFunWithGlobal = (argv: string[], isGlobal: boolean) => void

export interface IPkgMngCore {
  /**
   * @origin
   * skn
   * skn i
   * skn install
   * @npm
   * npm i
   * @yarn
   * yarn
   * @pnpm
   * pnpm i
   */
  installDeps: ExecArgvFun
  /**
   * @origin
   * skn add lodash
   * @npm
   * npm i lodash
   * @yarn
   * yarn add lodash
   * @pnpm
   * pnpm add lodash
   * @g_origin
   * skn add -g lodash
   * skn global add lodash
   * @g_npm
   * npm i -g lodash
   * @g_yarn
   * yarn gloabl add lodash
   * @g_pnpm
   * pnpm add -g lodash
   */
  addDep: ExecArgvFunWithGlobal
  /**
   * @origin
   * skn remove lodash
   * skn uninstall lodash
   * @npm
   * npm uninstall lodash
   * @yarn
   * yarn remove lodash
   * @pnpm
   * pnpm remove lodash
   * @g_origin
   * skn remove -g lodash
   * skn uninstall -g lodash
   * skn global remove lodash
   * skn global uninstall lodash
   * @g_npm
   * npm uninstall -g lodash
   * @g_yarn
   * yarn global remove lodash
   * @g_pnpm
   * pnpm remove -g lodash
   */
  removeDep: ExecArgvFunWithGlobal
  /**
   * @origin
   * skn dev
   * skn run dev
   * @npm
   * npm run dev
   * @yarn
   * yarn dev
   * @pnpm
   * pnpm dev
   */
  runScript: ExecArgvFun
  /**
   * @origin
   * skn dlx tsc
   * skx tsc
   * @npm
   * npx tsc
   * @yarn not support yarn 2/3
   * yarn tsc
   * @pnpm
   * pnpm dlx tsc
   */
  dlxCmd: ExecArgvFun
  /**
   * @origin
   * skn abcd -a
   * @npm
   * npm abcd -a
   * @yarn
   * yarn abcd -a
   * @pnpm
   * pnpm abcd -a
   */
  degradeCmd: ExecArgvFun
}

export abstract class PkgCore implements IPkgMngCore {
  abstract installDeps: ExecArgvFun
  abstract addDep: ExecArgvFunWithGlobal
  abstract removeDep: ExecArgvFunWithGlobal
  abstract runScript: ExecArgvFun
  abstract dlxCmd: ExecArgvFun
  abstract degradeCmd: ExecArgvFun
}
