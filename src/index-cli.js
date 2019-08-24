#!/usr/bin/env node
const program = require('commander');

program
.version(require('../package.json').version)
.command('pose','bodybuilder pose',{executableFile: 'pose-cli'})
.command('shout','bodybuilder shout',{executableFile: 'shout-cli'})
.parse(process.argv);
