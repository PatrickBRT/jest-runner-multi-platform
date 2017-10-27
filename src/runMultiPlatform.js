import jestRunner from 'jest-runner';
import { cloneDeep } from 'lodash';

import toTestResult from './utils/toTestResult';

const runTests = (globalConfig, { watcher, config, onStart, onResult, onFailure, options }, tests) => {
    const runner = new jestRunner(globalConfig);
    return runner.runTests(tests, watcher, onStart, onResult, onFailure, options);
}

const runMultiPlatform = (globalConfig, config) => {
    const start = +new Date();

    const androidTests = cloneDeep(config.tests).map(test => {
        const newTest = test;
        newTest.context.config.setupFiles.push('jest-setup.android.js');
        newTest.context.config.displayName = 'Android';
        return newTest;
    });

    const iOSTests = cloneDeep(config.tests).map(test => {
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

module.exports = runMultiPlatform;
