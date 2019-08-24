#!/usr/bin/env node
const _       = require('lodash')
const program = require('commander');
const posejs = require('./pose')

program._name = 'muscular pose'
program._usage = '\n\n ランダムにボディビルなポーズを表示します。'
program
.option('-p, --pose <name>','specify pose')
.option('-l, --list','list of Pose Name')
.action(options=>{
  console.log(posejs.action(options))
})
.parse(process.argv)
