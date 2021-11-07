const { ep } = require('../common')

process.cwd = jest.fn(() => __dirname)

test('npm: install dep', async () => {
  await ep('i', 'npm i')
  await ep('install', 'npm i')
  await ep('install -a', 'npm i -a')
  await ep('install -c=2', 'npm i -c=2')
})

test('npm: add dep', async () => {
  await ep('add lodash', 'npm i lodash')
  await ep('add -g lodash', 'npm i -g lodash')
  await ep('global add lodash', 'npm i -g lodash')
})

test('npm: remove dep', async () => {
  await ep('remove lodash', 'npm uninstall lodash')
  await ep('remove -g lodash', 'npm uninstall -g lodash')
  await ep('global remove lodash', 'npm uninstall -g lodash')
})

test('npm: run script', async () => {
  await ep('test', 'npm run test')
  await ep('run test', 'npm run test')
})

test('npm: degrade', async () => {
  await ep('publish', 'npm publish')
  await ep('login', 'npm login')
  await ep('ls lodash', 'npm ls lodash')
})

test('npx', async () => {
  await ep('tsc', 'npx tsc', true)
  await ep('dlx tsc', 'npx tsc')
})
