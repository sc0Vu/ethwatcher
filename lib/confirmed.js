'use strict'
const setTimeout = require('./setTimeout');

module.exports = function (eth, txHash, count) {
  return new Promise(function (resolve, reject) {
    const getTransaction = eth.getTransaction;

    if (!getTransaction) {
      return reject(new Error('Please set valid eth provider.'));
    }
    const getTransactionCallback = function (err, tx, blockNumber) {
      if (err) {
        return reject(err);
      }
      if (!tx || tx.blockNumber == null) {
        return reject(new Error('Cannot get eth tx.'));
      }
      if (blockNumber >= (tx.blockNumber + count)) {
        resolve(true);
      } else {
        setTimeout(function () {
          getTransaction(txHash, function (err, tx) {
            getTransactionCallback(err, tx, blockNumber);
          });
        }, 1000);
      }
    };

    eth.getBlockNumber().then(function (blockNumber) {
      if (!blockNumber) {
        return reject(new Error('Cannot get eth block number.'));
      }
      getTransaction(txHash, function (err, tx) {
        getTransactionCallback(err, tx, blockNumber);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
};