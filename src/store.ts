import path from 'path'
import findUp from 'find-up'
import ini from 'ini'
import fs from 'fs-extra'

const NPM_RC_FILE = '.npmrc'
const SKN_CONFIG_KEY = {
  defaultPkgMng: 'skn_pkg_mng',
}
const SKN_CONFIG_DEFAULT = {
  [SKN_CONFIG_KEY.defaultPkgMng]: 'pnpm',
}

const home =
  process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME

const globalNpmrcPath = path.join(home || '~/', NPM_RC_FILE)

export const getNpmrcPath = async () => {
  // 先找到最近一个 npmrc
  const recentNpmrcPath = await findUp(NPM_RC_FILE, { cwd: process.cwd() })
  if (recentNpmrcPath?.length) {
    return recentNpmrcPath
  }
  // 否则就去全局找
  return globalNpmrcPath
}

export const getNpmrcConfig = async () => {
  const npmrcPath = await getNpmrcPath()
  if (!npmrcPath) {
    return {}
  }
  if (!fs.existsSync(npmrcPath)) {
    return {}
  }
  const config = ini.parse(await fs.readFile(npmrcPath, 'utf-8'))
  return config || {}
}

export const getDefaultPkgMngConfig = async (): Promise<string> => {
  const config = await getNpmrcConfig()
  const key = SKN_CONFIG_KEY.defaultPkgMng
  return config?.[key] || SKN_CONFIG_DEFAULT[key]
}
