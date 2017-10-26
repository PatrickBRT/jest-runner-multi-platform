const throat = require('throat');
const pify = require('pify');
const workerFarm = require('worker-farm');
const path = require('path');

const runner = require('./runMultiPlatform.js')

class CancelRun extends Error {
  constructor(message) {
    super(message);
    this.name = 'CancelRun';
  }
}

module.exports = class ESLintTestRunner {
  constructor(globalConfig) {
    this._globalConfig = globalConfig;
  }

  // eslint-disable-next-line
  async runTests(tests, watcher, onStart, onResult, onFailure, options) {
    return runner(this._globalConfig,
    {
        watcher,
        tests,
        onStart,
        onResult,
        onFailure,
        options,
    });
  }
};
