const chalk = require('chalk');
const logger = console.log;
let log = {};

log.debug = function (message) {
  logger(chalk.green(`[Debug] ${message}`));
}

log.info = function (message) {
  logger(chalk.blue(`[Info] ${message}`));
}

log.error = function (message) {
  logger(chalk.red(`[Error] ${message}`));
}

log.warn = function (message) {
  logger(chalk.orange(`[Warning] ${message}`));
}

module.exports = log;