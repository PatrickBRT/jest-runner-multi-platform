import multiPlatformRunner from './runMultiPlatform';

class MultiPlatformTestRunner {
    constructor(globalConfig) {
        this._globalConfig = globalConfig;
    }

  async runTests(tests, watcher, onStart, onResult, onFailure, options) {
    return multiPlatformRunner(this._globalConfig, {
        watcher,
        tests,
        onStart,
        onResult,
        onFailure,
        options,
    });
  }
};

module.exports = MultiPlatformTestRunner;
