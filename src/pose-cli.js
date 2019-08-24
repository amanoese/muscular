#!/usr/bin/env node
const _       = require('lodash')
const program = require('commander');
const posejs = require('./pose')

program
.option('-p, --pose <name>','specify pose')
.option('-l, --list','list of Pose Name')
.action(options=>{
  console.log(posejs.action(options))
})
.parse(process.argv)
