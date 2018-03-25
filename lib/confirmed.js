'use strict'

module.exports = function (eth, txHash, count) {
  return new Promise(async function (resolve, reject) {
    if (!eth.getTransaction) {
      return reject(new Error('Please set valid eth provider.'));
    }
    try {
      const blockNumber = await eth.getBlockNumber();
      const getTransaction = eth.getTransaction;
      const callback = function (err, tx) {
        if (err) {
          return reject(err);
        }
        if (!tx || tx.blockNumber == null) {
          return resolve(null);
        }
        if (blockNumber >= (tx.blockNumber + count)) {
          resolve(true);
        } else {
          setTimeout(function () {
            getTransaction(txHash, callback)
          }, 1000);
        }
      };

      getTransaction(txHash, callback);
    } catch (err) {
      return reject(err);
    }
  });
};