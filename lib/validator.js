'use strict'

const assert = require('assert');
const typeList = [
  'http', 'ws', 'ipc'
];
const validator = {};

validator.isRPC = function isHost (rpc) {
  assert.equal(typeof rpc === 'string', true, 'RPC must be string.');

  return /^(https?|wss?|ipc):\/\/([\w^\s\.\d]+)(:[\d]+)?(\/.*)?$/.test(rpc);
}

validator.isHost = function isHost (host) {
  assert.equal(typeof host === 'string', true, 'Host must be string.');

  return /^([^\s\.]+\.){3}\d|localhost$/.test(host);
}

validator.isPort = function isPort (port) {
  if (typeof port === 'string') {
    assert(/^[0-9]+$/.test(port), 'Port must be numeric string.');
  } else if (typeof port !== 'number') {
    throw new Error('Please enter a valid port.');
  }
  const intPort = parseInt(port, 10);

  return intPort >= 0 && intPort <= 65535;
}

validator.isType = function isType (type) {
  assert.equal(typeof type === 'string', true, 'Type must be string.');

  return typeList.indexOf(type) >= 0;
}

validator.isTransactionHash = function isTransactionHash (hash) {
  if (typeof hash !== 'string') {
    throw new Error('Please enter a valid transaction hash.');
  }
  return /^(0x|0X)[0-9a-fA-F]{64}$/.test(hash);
}

validator.isAddress = function isAddress (address) {
  if (typeof address !== 'string') {
    throw new Error('Please enter a valid address.');
  }
  return /^(0x|0X)[0-9a-fA-F]{40}$/.test(address);
}

validator.isSeconds = function isSeconds (seconds) {
  if (typeof seconds === 'string') {
    assert(/^[0-9]+$/.test(seconds), 'Seconds must be numeric string.');
  } else if (typeof seconds !== 'number') {
    throw new Error('Please enter a valid seconds.');
  }
  const intSeconds = parseInt(seconds, 10);

  return intSeconds > 0;
}

module.exports = validator;