'use strict'

const setTimeout = require('./setTimeout');
const log = require('./log');

module.exports = function (eth, txHash, count) {
  return new Promise(function (resolve, reject) {
    const debug = process.env.NODE_ENV !== 'production';
    const getTransaction = eth.getTransaction;

    if (!getTransaction) {
      return reject(new Error('Please set valid eth provider.'));
    }
    const confirmed = function () {
      eth.getBlockNumber().then(function (blockNumber) {
        if (!blockNumber) {
          return reject(new Error('Cannot get eth block number.'));
        }

        getTransaction(txHash).then(function (tx) {
          if (!tx || tx.blockNumber == null) {
            return reject(new Error('Cannot get eth tx.'));
          }
          if (debug === true) {
            log.debug(`Block Number Now: ${blockNumber} Tx was in Block: ${tx.blockNumber} Tx Status: ${tx.status}`);
          }
          if (blockNumber >= (tx.blockNumber + count)) {
            resolve(true);
          } else {
            setTimeout(function () {
              confirmed();
            }, 1000);
          }
        }).catch(function (err) {
          reject(err);
        });
      }).catch(function (err) {
        reject(err);
      });
    };

    if (debug === true) {
      log.debug(`Tx hash: ${txHash} Count: ${count}`);
    }

    confirmed();
  });
};