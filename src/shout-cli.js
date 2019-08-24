#!/usr/bin/env node
const program   = require('commander');
const getStdin  = require('get-stdin')
const posejs    = require('./pose');
const echoSdSlim    = require('./echo-sd-slim');

const _     = require('lodash')
const fs    = require('fs');
const tempy = require('tempy');
const util  = require('util');
const exec  = util.promisify(require('child_process').exec);

const appRoot = require('app-root-path');

let muscular_shout = () => {
  let words = require(`${appRoot}/data/shout.json`)
  return _.shuffle(words)[0]
}

program._name = 'muscular shout'
program._usage = '[text]\n\n ランダムにボディビルなポーズとテキストを表示します。'

program
.option('-p, --pose <name>','specify pose')
.option('--pose-list','list of Pose Name')
.arguments('[text]')
.action(async (text,options)=> {
  if(options.poseList != null){
    console.log(posejs.action({ list : true }))
    return
  }

  let inputText = text ||
    (await getStdin()) ||
    muscular_shout();

  let aa_text = posejs.action(options)
  let aa_list = aa_text.split('\n')
  let aa_height  = aa_list.length

  let textCut = inputText.replace(new RegExp(`.{${(aa_height -1 ) - 2}}`,'g'),'$&\n')
  let echo_sd_text = echoSdSlim.tatePrint(textCut)

  //console.log({inputText,textCut,echo_sd_text})
  let echo_sd_list = echo_sd_text.split('\n')

  let echo_sd_list_centering = [
    ..._.range(_.floor((aa_height - echo_sd_list.length) /2)).map(_=>''),
    ...echo_sd_list
  ]

  let output = aa_list
    .map((v,i)=>v + ' ' + (echo_sd_list_centering[i]||''))
    .join('\n')

  console.log(output)
})
.parse(process.argv);
