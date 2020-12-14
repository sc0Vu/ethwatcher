# ethwatcher
[![Build Status](https://travis-ci.org/sc0Vu/ethwatcher.svg?branch=master)](https://travis-ci.org/sc0Vu/ethwatcher)
[![codecov](https://codecov.io/gh/sc0Vu/ethwatcher/branch/master/graph/badge.svg)](https://codecov.io/gh/sc0Vu/ethwatcher)

Ethereum blockchain watcher library.

# Usage in command line
1. Install
```
$ npm install -g ethwatcher
```

2. Run ethwatcher
```
$ ethwatcher

  Usage: ethwatcher [options] [command]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information

  Commands:

    config         Create the ethwatcher tool config.
    confirmed      Check the transaction is confirmed.
    watch          Watch the latest block and find transactions related to the address.
    help [cmd]     display help for [cmd]
```

3. Run ethwatcher config to generate config file
```
$ ethwatcher config -h https://host:port/path

[Info] Config was saved: /Users/test/Desktop/t/ethwatcher.yaml
```

4. Confirm the transaction
```
$ ethwatcher confirmed -c ./ethwatcher.yaml -x 0x1b1c51f6c750443c4dad33765715bb674c624fc54219ac4f22c5e328ce57c126 -n 10000 -s 1

[Info] Start to check params
[Debug] Tx hash: 0x1b1c51f6c750443c4dad33765715bb674c624fc54219ac4f22c5e328ce57c126 Count: 10000
[Debug] Block Number Now: 323803 Tx was in Block: 311306
[Info] 0x1b1c51f6c750443c4dad33765715bb674c624fc54219ac4f22c5e328ce57c126 had been confirmed 10000 times.
```

5. Watch the address
```
$ ethwatcher watch -c ./ethwatcher.yaml -a 30b82c8694b59695d78f33a7ba1c2a55dfa618d5 -s 3 -l

[Info] Start to check params
[Debug] Address: 0x30b82c8694b59695d78f33a7ba1c2a55dfa618d5
[Debug] Block Number Now: 323835 transactions count: 0
[Debug] Block Number Now: 323836 transactions count: 0
[Debug] Block Number Now: 323837 transactions count: 0
[Debug] Block Number Now: 323838 transactions count: 0
[Debug] Block Number Now: 323839 transactions count: 0
[Debug] Block Number Now: 323840 transactions count: 0
[Debug] Block Number Now: 323841 transactions count: 0
[Debug] Block Number Now: 323842 transactions count: 1
[Info] Your got total 1 transactions.
[Info] Tx hash: 0xd69c18340ad10cfcd34d21d195544eb10d0e34fdcf9f32a252c180efcfbc3578
[Info] From: 0x30b82C8694b59695d78f33a7bA1C2A55dfA618d5
[Info] To: null
[Info] Value: 0
[Info] Nonce: 1097
```

# Usage in library
* Requirement: web3-eth (change in the future)

1. Install library
```
$ npm install ethwatcher
```

2. Confirm the transaction
```JS
const EthProvider = require('ethwatcher').ethProvider;
const confirmed = require('ethwatcher').confirmed; // const confirmed = require('ethwatcher/lib/confirmed');
const eth = new EthProvider('http://localhost:8545');
const txHash = '0xc16c42e9f1ab9031ca5125352df82587dfc4a066c3ace96a1037b7abb3f25b90';
const numberCount = 100;
const retrySeconds = 3;

confirmed(eth, txHash, numberCount, retrySeconds).then((confirmed) => {
  if (confirmed === true) {
    console.log(`${txHash} had been confirmed ${numberCount} times.`);
  } else {
    console.log('Please check your environment.');
  }
}).catch((err) => {
  console.log(`Confirm error: ${err.message}`);
});

```

3. Watch the address
```JS
const EthProvider = require('ethwatcher').ethProvider;
const watch = require('ethwatcher').watch;
const eth = new EthProvider('http://localhost:8545');
const address = '0x30b82c8694b59695d78f33a7ba1c2a55dfa618d5'; // const watch = require('ethwatcher/lib/watch');
const retrySeconds = 3;
const watchFrom = false;
const watchTo = true;

watch(eth, address, retrySeconds, watchFrom, watchTo).then((txs) => {
  console.log(`Your got total ${txs.length} transactions.`);
  txs.forEach((tx) => {
    console.log(tx);
  });
}).catch((err) => {
  console.log(`Watch error: ${err.message}`);
});

```


# Test
```
$ npm run test
```

# Development
1. Fork this repo and clone to your computer.
2. Start a ethereum blockchain service, you can use [ganache-cli](https://github.com/trufflesuite/ganache-cli), you can also use docker container see [ethdock](https://github.com/sc0Vu/ethdock).
3. Install packages
```
$ npm install

```
4. Start to develop and have fun.

# Demo
![ethwatcher-demo](https://user-images.githubusercontent.com/10494397/42148654-af54c29e-7e05-11e8-9610-64ea3a0fbd05.gif)

# TODO

- [ ] Watch multiple addresses at the same time
- [ ] Update validator of URL format from RFC

# Contribution
Thank you for considering to help out with the source code!


# License
MIT
