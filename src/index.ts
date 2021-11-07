import { parserPkgMng } from './parser'

const run = ({
  argv,
  originArgv = [],
  isNpx = false,
}: {
  argv: Record<string, any>
  originArgv: string[]
  isNpx?: boolean
}) => {
  parserPkgMng({
    argv: originArgv,
    isNpx,
  })
}

export = {
  run,
}
