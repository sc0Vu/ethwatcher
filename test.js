const fs = require('fs-extra');
const path = require('path');
const testDir = path.join(__dirname, 'test');
const log = require('./lib/log');

function runTestDirectory(directory) {
  log.info(`Start to run test directory: ${directory}`);

  fs.readdir(directory)
    .then((files) => {
      files = files.filter((file) => {
        return ((file !== 'node_modules' && !/^\.(.*)$/.test(file.trim())) || /^[a-zA-Z]+Test\.js$/.test(file.trim()));
      });
      files.forEach(async (file) => {
        try {
          let stats = await fs.stat(path.join(directory, file));

          if (stats.isDirectory()) {
            runTestDirectory(path.join(directory, file));
          } else {
            runTestFile(directory, file);
          }
        } catch(e) {
          log.error(`Stat ${file} error: ${e.message}`);
        }
      });
      // log.info('Exit');
    })
    .catch((err) => {
      log.error(`Read directory error: ${err.message}`);
    });
}

function runTestFile(directory, file) {
  log.info(`Start to run test ${file}`);
  try {
    require(path.join(directory, file));
  } catch(e) {
    log.error(`Run test failed, directory: ${directory}, file: ${file}, error: ${e.message}`);
  }
}

runTestDirectory(testDir);
