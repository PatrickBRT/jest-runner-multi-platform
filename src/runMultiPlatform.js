const toTestResult = require('./utils/toTestResult');
const _ = require('lodash');
const jestRunner = require('jest-runner');
const jest = require('jest');

const runTests = (globalConfig, { watcher, config, onStart, onResult, onFailure, options }, tests) => {
   const runner = new jestRunner(globalConfig);

    return runner.runTests(tests, watcher, onStart, onResult, onFailure, options);
}

const skip = ({ start, end, testPath }) =>
  toTestResult({
    stats: {
      failures: 0,
      pending: 1,
      passes: 0,
      start,
      end,
    },
    skipped: true,
    tests: [
      {
        duration: end - start,
        testPath,
      },
    ],
    jestTestPath: testPath,
  });

const fail = ({ start, end, testPath, errorMessage }) =>
  toTestResult({
    errorMessage,
    stats: {
      failures: 1,
      pending: 0,
      passes: 0,
      start,
      end,
    },
    tests: [
      {
        duration: end - start,
        testPath,
        errorMessage,
      },
    ],
    jestTestPath: testPath,
  });

const pass = ({ start, end, testPath }) =>
  toTestResult({
    stats: {
      failures: 0,
      pending: 0,
      passes: 1,
      start,
      end,
    },
    tests: [
      {
        duration: end - start,
        testPath,
      },
    ],
    jestTestPath: testPath,
  });


const runESLint = (globalConfig, config) => {
    const start = +new Date();

    const androidTests = _.cloneDeep(config.tests).map(test => {
        const newTest = test;
        newTest.context.config.setupFiles.push('jest-setup.android.js');
        newTest.context.config.displayName = 'Android';
        return newTest;
    });

    const iOSTests = _.cloneDeep(config.tests).map(test => {
        const newTest = test;
        newTest.context.config.setupFiles.push('jest-setup.ios.js');
        newTest.context.config.displayName = 'iOS';
        return newTest;
    });

    const promises = [
        runTests(globalConfig, config, androidTests),
        runTests(globalConfig, config, iOSTests),
    ];

    return Promise.all(promises);
};

module.exports = runESLint;
