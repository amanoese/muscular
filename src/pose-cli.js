#!/usr/bin/env node
const _       = require('lodash')
const program = require('commander');
const posejs = require('./pose')

program
.option('-p, --pose <name>','specify pose')
.option('-l, --list','list of Pose Name')
.action(options=>{
  let { pose , list } = options
  if (list != null) {
    console.log(posejs.list().join('\n'))
    return
  }
  pose = pose || posejs.getPoseNmae()
  console.log(posejs.getAA(pose))
})
.parse(process.argv)
