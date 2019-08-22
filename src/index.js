#!/usr/bin/env node
const program = require('commander');
const getStdin = require('get-stdin')
const FileHound = require('filehound');
const fs = require('fs');

const filesp = FileHound.create()
  .paths('./data_aa')
  .ext('txt')
  .find();

program
.version(require('../package.json').version)
.arguments('[text]')
.action(async text => {
  let inputText = text || (await getStdin())
  let files = await filesp

  let aa_path = files[(Math.random() * files.length).toFixed()]
  let raw_aa = fs.readFileSync(aa_path).toString()
  let height = raw_aa.split('\n').length
  let width  = Math.max(...raw_aa.split('\n').map(s=>s.length))
  let aa = raw_aa.split('\n')
    .map(s=>`${s}${' '.repeat(width)}`.slice(0,width))
    .join('\n')

  console.log(inputText.replace(/\n$/,''))
  console.log(aa)
})
.parse(process.argv);
