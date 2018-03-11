'use strict'

const assert = require('assert');
const typeList = [
  'http', 'ws', 'ipc'
];
const util = {};

util.isHost = function isHost (host) {
  assert.equal(typeof host === 'string', true, 'Host must be string.');

  return /(?:\w+:\/\/)?([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*/.test(host);
}

util.isPort = function isPort (port) {
  if (typeof port === 'string') {
    assert(/^[0-9]+$/.test(port), 'Port must be number.');
  } else if (typeof port !== 'number') {
    throw new Error('Please enter a valid port.');
  }
  const intPort = parseInt(port, 10);

  return intPort >= 0 && intPort <= 65535;
}

util.isType = function isType (type) {
  assert.equal(typeof type === 'string', true, 'Type must be string.');

  return typeList.indexOf(type) >= 0;
}

module.exports = util;