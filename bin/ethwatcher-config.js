#!/usr/bin/env node
'use strict'

const program = require('commander');
const assert = require('assert');
const path = require('path');
const Config = require('simple-yaml-config');
const pkg = require('../package.json');
const validator = require('../lib/validator');
const log = require('../lib/log');

program
  .version(pkg.version)
  .option('-h, --host [host]', 'Ethereum blockchain rpc host.', 'localhost')
  .option('-p, --port [port]', 'Ethereum blockchain rpc port.', 8545)
  .option('-t, --type [type]', 'Ethereum blockchain rpc connection type.', 'http')
  .option('-c, --chdir [chdir]', 'Config directory', process.cwd())
  .option('-f, --fileName [fileName]', 'Config file name', 'ethwatcher.yaml')
  .parse(process.argv);

if (validator.isHost(program.host) !== true) {
  log.error('Please enter valid host.');
  process.exit();
}
if (validator.isPort(program.port) !== true) {
  log.error('Please enter valid port.');
  process.exit();
}
if (validator.isType(program.type) !== true) {
  log.error('Please enter valid type.');
  process.exit();
}

const config = new Config({
  host: program.host,
  port: parseInt(program.port, 10),
  type: program.type
})
const fileName = path.join(program.chdir, program.fileName);

config.save(fileName).then(() => {
  log.info(`Config was saved: ${fileName}`);
}).catch((err) => {
  log.error(`Cannot save config file: ${fileName}, error: ${err.message}`);
})