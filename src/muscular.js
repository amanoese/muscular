#!/usr/bin/env node
const appRoot = `${__dirname}/..`
const fs      = require('fs');
const program = require('commander');

program._usage = '[command]\n\n' +
 '筋肉の力は最高のパワーであることを表現するためのコマンドです。\n' +
 'いくつかのボディビルポーズと掛け声を収録しています。'
program
.version(require('../package.json').version)
.command('pose','bodybuilder pose')
.command('shout','bodybuilder shout')
.on('--help', function() {
  console.log(`
Examples:
  $ muscular shout ナイスバルク
` +  fs.readFileSync(`${appRoot}/__tests__/shout-result.txt`).toString())
})
.parse(process.argv);
