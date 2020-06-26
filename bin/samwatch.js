#!/usr/bin/env node

const cli = require('../lib/cli');
const samwatch = require('../lib/');
const options = cli.parse(process.argv);

samwatch(options);

