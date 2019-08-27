#!/usr/bin/env node
const appRoot = `${__dirname}/..`
const fs      = require('fs');
const program = require('commander');

const { execSync } = require('child_process')

program._usage = '[command]\n\n' +
 '筋肉の力は最高のパワーであることを表現するためのコマンドです。\n' +
 'いくつかのボディビルポーズと掛け声を収録しています。'
program
.version(require('../package.json').version)
.command('pose','bodybuilder pose')
.command('shout','bodybuilder shout')
.on('--help', async () => {
  let stdout = execSync(`${appRoot}/src/muscular.js shout -p フロントリラックス ナイスバルク`)
  process.stdout.write(`
Examples:
  $ muscular shout ナイスバルク
${stdout.toString()}`)

})
.parse(process.argv);
