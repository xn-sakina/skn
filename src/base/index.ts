import { exec } from '../utils'

export const CMD_IMPL = {
  NPM: 'npm',
  NPX: 'npx',
  YARN: 'yarn',
  PNPM: 'pnpm',
}

export const IDENTIFY_FILE_NAME = {
  npm: 'package-lock.json',
  yarn: 'yarn.lock',
  pnpm: 'pnpm-lock.yaml',
}

export const npm = (argv: string[]) => {
  exec(CMD_IMPL.NPM, argv)
}

export const npx = (argv: string[]) => {
  exec(CMD_IMPL.NPX, argv)
}

export const yarn = (argv: string[]) => {
  exec(CMD_IMPL.YARN, argv)
}

export const pnpm = (argv: string[]) => {
  exec(CMD_IMPL.PNPM, argv)
}

/**
 * @version pnpm >6.13.0
 */
export const pnpx = (argv: string[]) => {
  pnpm(['dlx', ...argv])
}
