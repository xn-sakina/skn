const { ep } = require('../common')

process.cwd = jest.fn(() => __dirname)

test('pnpm: install dep', async () => {
  await ep('i', 'pnpm i')
  await ep('install', 'pnpm i')
  await ep('install -a', 'pnpm i -a')
  await ep('install -c=2', 'pnpm i -c=2')
})

test('pnpm: add dep', async () => {
  await ep('add lodash', 'pnpm add lodash')
  await ep('add -g lodash', 'pnpm add -g lodash')
  await ep('global add lodash', 'pnpm add -g lodash')
})

test('pnpm: remove dep', async () => {
  await ep('remove lodash', 'pnpm remove lodash')
  await ep('remove -g lodash', 'pnpm remove -g lodash')
  await ep('global remove lodash', 'pnpm remove -g lodash')
})

test('pnpm: run script', async () => {
  await ep('test', 'pnpm test')
  await ep('run test', 'pnpm test')
})

test('pnpm: degrade', async () => {
  await ep('publish', 'pnpm publish')
  await ep('login', 'pnpm login')
  await ep('ls lodash', 'pnpm ls lodash')
})

test('pnpx', async () => {
  await ep('tsc', 'pnpm dlx tsc', true)
  await ep('dlx tsc', 'pnpm dlx tsc')
})
