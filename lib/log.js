'use strict'

const chalk = require('chalk');
const log = {};

/**
 * Maybe construct
 */
log.logger = console;

log.debug = function (message) {
  this.logger.log(chalk.green(`[Debug] ${message}`));
}

log.info = function (message) {
  this.logger.log(chalk.blue(`[Info] ${message}`));
}

log.error = function (message) {
  this.logger.log(chalk.red(`[Error] ${message}`));
}

log.warn = function (message) {
  this.logger.log(chalk.keyword('orange')(`[Warning] ${message}`));
}

module.exports = log;