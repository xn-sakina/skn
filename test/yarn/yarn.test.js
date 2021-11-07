const { ep } = require('../common')

process.cwd = jest.fn(() => __dirname)

test('yarn: install dep', async () => {
  await ep('i', 'yarn')
  await ep('install', 'yarn')
  await ep('install -a', 'yarn -a')
  await ep('install -c=2', 'yarn -c=2')
})

test('yarn: add dep', async () => {
  await ep('add lodash -D', 'yarn add lodash -D')
  await ep('add -g lodash', 'yarn global add lodash')
  await ep('global add lodash', 'yarn global add lodash')
})

test('yarn: remove dep', async () => {
  await ep('remove lodash', 'yarn remove lodash')
  await ep('remove -g lodash', 'yarn global remove lodash')
  await ep('global remove lodash', 'yarn global remove lodash')
})

test('yarn: run script', async () => {
  await ep('test', 'yarn test')
  await ep('run test', 'yarn test')
  await ep('dev', 'yarn dev')
})

test('yarn: degrade', async () => {
  await ep('publish', 'yarn publish')
  await ep('login', 'yarn login')
  await ep('ls lodash', 'yarn ls lodash')
})

test('yarn(npx degrade)', async () => {
  await ep('tsc', 'yarn tsc', true)
  await ep('dlx tsc', 'yarn tsc')
})
