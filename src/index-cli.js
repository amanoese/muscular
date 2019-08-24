#!/usr/bin/env node
const appRoot = require('app-root-path');
const fs      = require('fs');
const program = require('commander');

program._usage = 
 '[command]\n\nMuscularは筋肉の力は最高のパワーであることを表現するためのコマンドです。' +
 'いくつかのボディビルポーズと掛け声を収録しています。'
program
.version(require('../package.json').version)
.command('pose','bodybuilder pose',{executableFile: 'pose-cli'})
.command('shout','bodybuilder shout',{executableFile: 'shout-cli'})
.on('--help', function() {
  console.log(`
Examples:
  $ muscular shout ナイスバルク
` +  fs.readFileSync(`${appRoot}/__tests__/shout-result.txt`).toString())
})
.parse(process.argv);
