const { ep } = require('../common')

process.cwd = jest.fn(() => __dirname)

test('new: install dep', async () => {
  await ep('i', 'yarn')
})
