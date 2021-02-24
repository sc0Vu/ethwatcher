const validator = require('./lib/validator');
const confirmed = require('./lib/confirmed');
const watch = require('./lib/watch');
const ethers = require('ethers');
const watcherLib = {};

watcherLib.validator = validator;
watcherLib.confirmed = confirmed;
watcherLib.watch = watch;
watcherLib.ethProvider = function (url) {
  return new ethers.providers.JsonRpcProvider(url);
i}

module.exports = watcherLib;
