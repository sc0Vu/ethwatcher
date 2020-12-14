const tape = require('tape');
const validator = require('../../lib/validator');

tape('lib/validator', (t) => {

  // isRPC
  t.equals(true, validator.isRPC('http://localhost'));
  t.equals(true, validator.isRPC('http://localhost:8545'));
  t.equals(false, validator.isRPC('127.0.0.1'));

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

  // isTransactionHash
  [
    '0x73906248cc3fdcec3be2fdbdeba7b232aa4ef799101e145ea29b291125ea6c0c', '0x43af4d0034909bd1cda28064664cfe92fd729590f49e235ff4e90f9424a68588',
    '0x7ac8a56ce12cd0a6485c133708ef58c84562f4c532f46b319f291df5929276cd', '0xde7c85f9abbb25e775b724318bcd4dc7e79f12e3e338a9946df9c596d5e2123c',
    '0x1c2699f384fd11157748450a7a4973f3745c504f668850d34a24ec858976283e', '0x724951cc9f56f88e351ca1e505b0ac022be54bab864cfdb7ac24b443bc0f220e',
    '0xdf5349a50a66b7dc61744d3389c35b86e775fdb7b2b755615ff40da91c89b5c3', '0x4fb157ca57bb5a9306ed01ee58fba9342ad47cbfd7b8c101ab889616a3df5b2d',
    '0x9af4fba96c07d4aaebb5596434a82cc30945fffde4732ff1a06a97d0fe71210f', '0x5898f8051d8531d1b3a57d8f5fa6c4185ec65aeb8a38adb5a7d4a16913c76c1f', 
    '0Xd79ea8752fec51dc942ce5a77635173e1a0e46dbac9ee0ec8aa81f74b7d3135c', '0Xe5d5452062e7a7889390717836339412025f172ed44d6342adb1992cc42d5c68'
  ].forEach((txHash) => {
    t.equals(true, validator.isTransactionHash(txHash));
  });

  [
    'f715cd81dd62c2801e58f4e99fb073696a9f0397bf7a2b1652a2d61369162bc8', '507984bb9a1b3bc0aa484dbad21f324c9ff38e16fd8bbb457932846d328f294a',
  ].forEach((txHash) => {
    t.equals(false, validator.isTransactionHash(txHash));
  });

  // isAddress
  [
    '0x73906248cc3fdcec3be2fdbdeba7b232aa4ef799', '0x43af4d0034909bd1cda28064664cfe92fd729590',
    '0X7ac8a56ce12cd0a6485c133708ef58c84562f4c5', '0Xde7c85f9abbb25e775b724318bcd4dc7e79f12e3',
  ].forEach((address) => {
    t.equals(true, validator.isAddress(address));
  });

  [
    'f715cd81dd62c2801e58f4e99fb073696a9f0397', '507984bb9a1b3bc0aa484dbad21f324c9ff38e16',
  ].forEach((address) => {
    t.equals(false, validator.isAddress(address));
  });

  // isSeconds
  t.equals(true, validator.isSeconds('8'));
  t.equals(true, validator.isSeconds(8));
  t.equals(false, validator.isSeconds('0'));
  t.equals(false, validator.isSeconds(0));
  t.end();
});