const tape = require('tape');
const validator = require('../../lib/validator');

tape('lib/validator', (t) => {
  // isHost
  t.equals(true, validator.isHost('localhost'));
  t.equals(true, validator.isHost('127.0.0.1'));
  t.equals(false, validator.isHost('localhost:8545'));
  t.equals(false, validator.isHost('http://localhost:8545'));

  // isPort
  t.equals(true, validator.isPort('8545'));
  t.equals(true, validator.isPort(8545));

  try {
    t.equals(false, validator.isPort('abcd'));
  } catch (e) {
    t.equals('Port must be numeric string.', e.message);
  }

  // isType
  t.equals(true, validator.isType('http'));
  t.equals(true, validator.isType('ws'));
  t.equals(true, validator.isType('ipc'));
  t.equals(false, validator.isType('ethwatcher'));
  t.end();
});