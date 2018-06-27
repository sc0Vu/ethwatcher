'use strict'

const setTimeout = require('./setTimeout');
const log = require('./log');

module.exports = function (eth, txHash, count, retrySeconds) {
  return new Promise(function (resolve, reject) {
    const debug = process.env.NODE_ENV !== 'production';
    const getTransaction = eth.getTransaction;

    if (!getTransaction) {
      return reject(new Error('Please set valid eth provider.'));
    }
    let lastBlockNumber = 0;

    // parse count to number
    count = parseInt(count, 10);
    txHash = txHash.toLowerCase();
    retrySeconds = retrySeconds * 1000;

    const confirmed = function () {
      eth.getBlockNumber().then(function (blockNumber) {
        if (!blockNumber) {
          return reject(new Error('Cannot get eth block number.'));
        }
        if (lastBlockNumber === 0 || lastBlockNumber != blockNumber) {
          lastBlockNumber = blockNumber;
        } else {
          // maybe limit retry times
          setTimeout(function () {
            confirmed();
          }, retrySeconds);
          return;
        }

        getTransaction(txHash).then(function (tx) {
          if (!tx) {
            return reject(new Error('Cannot get eth tx.'));
          }
          if (tx.blockNumber == null) {
            // maybe limit retry times
            return setTimeout(function () {
              confirmed();
            }, retrySeconds);
          }
          if (debug === true) {
            log.debug(`Block Number Now: ${blockNumber} Tx was in Block: ${tx.blockNumber}`);
          }
          if (blockNumber >= (tx.blockNumber + count)) {
            return resolve(true);
          }

          // maybe limit retry times
          setTimeout(function () {
            confirmed();
          }, retrySeconds);
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