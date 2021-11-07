import { CMD_IMPL, IDENTIFY_FILE_NAME } from '../base'
import { commandAdapter } from '../adapter'
import { findFile, IFindFileResult } from '../utils'

import { PnpmImpl } from '../impl/pnpm'
import { YarnImpl } from '../impl/yarn'
import { NpmImpl } from '../impl/npm'
import { PkgCore } from '../impl/core'
import { getDefaultPkgMngConfig } from '../store'

export const parserPkgMng = async ({
  argv = [],
  isNpx = false,
}: {
  argv: string[]
  isNpx: boolean
}) => {
  const { isExist: isNpm, ...npmInfo } = await findFile(IDENTIFY_FILE_NAME.npm)
  const { isExist: isYarn, ...yarnInfo } = await findFile(
    IDENTIFY_FILE_NAME.yarn
  )
  const { isExist: isPnpm, ...pnpmInfo } = await findFile(
    IDENTIFY_FILE_NAME.pnpm
  )
  let ins: null | PkgCore = null
  let info: Omit<IFindFileResult, 'isExist'> = {
    scripts: [],
  }
  const setNpm = () => {
    ins = new NpmImpl()
    info = npmInfo
  }
  const setYarn = () => {
    ins = new YarnImpl()
    info = yarnInfo
  }
  const setPnpm = () => {
    ins = new PnpmImpl()
    info = pnpmInfo
  }
  switch (true) {
    case isNpm:
      setNpm()
      break
    case isYarn:
      setYarn()
      break
    case isPnpm:
      setPnpm()
      break
    default:
      // user define new project use pkg mng
      const defaultPkgMng = await getDefaultPkgMngConfig()
      if (defaultPkgMng === CMD_IMPL.NPM) {
        setNpm()
        break
      }
      if (defaultPkgMng === CMD_IMPL.YARN) {
        setYarn()
        break
      }
      if (defaultPkgMng === CMD_IMPL.PNPM) {
        setPnpm()
        break
      }
      // 😅
      setPnpm()
  }
  commandAdapter({
    argv,
    ins: ins as any as PkgCore,
    isNpx,
    ...info,
  })
}
