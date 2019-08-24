#!/usr/bin/env node
const program = require('commander');

program
.version(require('../package.json').version)
.command('shout','bodybuilder shout',{executableFile: 'shout'})
.parse(process.argv);
