#!/usr/bin/env node
const program   = require('commander');
const getStdin  = require('get-stdin')
const posejs    = require('./pose.js');

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

program
.arguments('[text]')
.action(async text => {
  let inputText = text ||
    (await getStdin()) ||
    muscular_shout();

  let aa_text = posejs.getAA(posejs.getPoseName())
  let aa_list = aa_text.split('\n')
  let aa_height  = aa_list.length

  let inputTextPath = tempy.file()
  let regexp = new RegExp(`(.{${aa_height - 2}})`,'g')
  fs.writeFileSync(inputTextPath,inputText.replace(regexp,'$1\n'))
  let echo_sd_text = (await exec(`echo-sd -v $(cat ${inputTextPath})`)).stdout

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
