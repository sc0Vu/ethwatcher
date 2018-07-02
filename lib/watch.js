'use strict'

const setTimeout = require('./setTimeout');
const log = require('./log');

module.exports = function (eth, address, retrySeconds, watchFrom, watchTo) {
  return new Promise(function (resolve, reject) {
    const debug = process.env.NODE_ENV !== 'production';
    const getBlock = eth.getBlock;

    if (!getBlock) {
      return reject(new Error('Please set valid eth provider.'));
    }
    let lastBlockNumber = 0;

    address = address.toLowerCase();
    retrySeconds = retrySeconds * 1000;

    const watchAddress = function () {
      eth.getBlockNumber().then(function (blockNumber) {
        if (!blockNumber) {
          return reject(new Error('Cannot get eth block number.'));
        }
        if (lastBlockNumber === 0 || lastBlockNumber != blockNumber) {
          lastBlockNumber = blockNumber;
        } else {
          // maybe limit retry times
          setTimeout(function () {
            watchAddress();
          }, retrySeconds);
          return;
        }

        getBlock(blockNumber, true).then(function (block) {
          if (!block) {
            return reject(new Error('Cannot get eth block.'));
          }
          if (debug === true) {
            log.debug(`Block Number Now: ${blockNumber} transactions count: ${block.transactions.length}`);
          }

          const transactions = block.transactions.filter((tx) => {
            const from = tx.from.toLowerCase();
            const to = (tx.to !== null) ? tx.to.toLowerCase() : '';

            return (watchFrom && from === address) || (watchTo && to === address);
          });

          if (transactions.length > 0) {
            resolve(transactions);
            return;
          }

          // maybe limit retry times
          setTimeout(function () {
            watchAddress();
          }, retrySeconds);
        }).catch(function (err) {
          reject(err);
        });
      }).catch(function (err) {
        reject(err);
      });
    };

    if (debug === true) {
      log.debug(`Address: ${address}`);
    }

    watchAddress();
  });
};