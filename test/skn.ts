#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const { run } = require('../src')

const originArgv = hideBin(process.argv)
const argv = yargs(originArgv).argv

run({ argv, originArgv })
