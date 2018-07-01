const validator = require('./lib/validator');
const confirmed = require('./lib/confirmed');
const watch = require('./lib/watch');
const Eth = require('web3-eth');
const watcherLib = {};

watcherLib.validator = validator;
watcherLib.confirmed = confirmed;
watcherLib.watch = watch;
watcherLib.ethProvider = function (url) {
  return new Eth(url);
}

module.exports = watcherLib;
