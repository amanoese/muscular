#!/usr/bin/env node
const program = require('commander');
const getStdin = require('get-stdin')
const FileHound = require('filehound');
const fs = require('fs');
const tempy = require('tempy');
const _ = require('lodash')

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const filesp = FileHound.create()
  .paths(`${__dirname}/../data_aa/`)
  .ext('txt')
  .find();

let muscular_shout = () => {
  let words = fs
    .readFileSync(`${__dirname}/../data/shout.txt`)
    .toString()
    .split('\n')

  return _.shuffle(words)[0]
}

program
.version(require('../package.json').version)
.arguments('[text]')
.action(async text => {
  let inputText = text ||
    (await getStdin()) ||
    muscular_shout();

  let files = await filesp
  let aa_path = _.shuffle(files)[0]

  let raw_aa = fs.readFileSync(aa_path).toString()
  let height = raw_aa.split('\n').length
  let width  = Math.max(...raw_aa.split('\n').map(s=>s.length))
  let aa_list = raw_aa.split('\n')
    .map(s=>`${s}${' '.repeat(width)}`.slice(0,width))

  let inputTextPath = tempy.file()
  let regexp = new RegExp(`(.{${height - 2}})`,'g')
  fs.writeFileSync(inputTextPath,inputText.replace(regexp,'$1\n'))

  let echo_sd_text = (await exec(`${__dirname}/../lib/echo-sd -v $(cat ${inputTextPath})`)).stdout
  let echo_sd_list = echo_sd_text.split('\n')

  let echo_sd_list_centering = [
    ...Array.from({length:Math.floor((height - echo_sd_list.length) /2)}),
    ...echo_sd_list
  ]

  let output = aa_list
    .map((v,i)=>v + ' ' + (echo_sd_list_centering[i]||''))
    .join('\n')

  console.log(output)
})
.parse(process.argv);
