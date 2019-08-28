#!/usr/bin/env node
const program  = require('commander');
const getStdin = require('get-stdin')
const posejs   = require('./pose');
const shoutjs  = require('./shout');

const _ = require('lodash')
const appRoot = `${__dirname}/..`

let muscular_shout = () => {
  let words = require(`${appRoot}/data/shout.json`)
  return _.shuffle(words)[0]
}

program._name = 'muscular shout'
program._usage = '[text]\n\n ランダムにボディビルなポーズとテキストを表示します。'

program
.option('-p, --pose <name>','specify pose')
.option('--pose-list','list of Pose Name With Ext')
.arguments('[text]')
.action(async (text,options)=> {
  if(options.poseList != null){
    console.log(posejs.action({ list : true }))
    return
  }

  let inputText = text || (await getStdin()) || muscular_shout();

  let output = shoutjs.action(inputText,options)
  console.log(output)
})
.parse(process.argv);
