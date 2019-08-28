#!/usr/bin/env node
const appRoot = `${__dirname}/..`
const fs      = require('fs');
const program = require('commander');

const shoutjs  = require('./shout');

program._usage = '[command]\n\n' +
 '筋肉の力は最高のパワーであることを表現するためのコマンドです。\n' +
 'いくつかのボディビルポーズと掛け声を収録しています。'
program
.version(require('../package.json').version)
.command('pose','bodybuilder pose')
.command('shout','bodybuilder shout')
.on('--help', () => {
  let output = shoutjs.action('ナイスバルク',{ pose : 'front-relax' })

  process.stdout.write(`
Examples:
  $ muscular shout ナイスバルク
${output}\n`)

})
.parse(process.argv);
