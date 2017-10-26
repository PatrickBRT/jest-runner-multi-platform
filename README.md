# jest-runner-multi-platform

An experimental multi-platform runner for Jest

![example](blob:https://imgur.com/ffd0b15c-e475-4c90-a119-21e6f562b114)

## What's it about?
I do want to be sure that rendering (or other stuff) is the same on both (Android and iOS) platforms for RN.

Thats where this jest-runner comes into play!
It takes your testcases and calls them two times.
Once where it adds jest-setup.android.js and once where it adds jest-setup.ios.js to the setupFiles.
In those files you can do whatever you want, but I highly suggest to mock RN-Platform in there, like so:

```javascript
jest.mock('Platform', () => ({
    OS: 'android',
    Version: 21,
}));
```

## Usage

### Install

Install `jest`_(it needs Jest 21+)_ and `jest-runner-multi-platform`


### Add it to your Jest config

In your `package.json`
```json
{
  "jest": {
    "runner": "jest-runner-multi-platform"
  }
}
```

### Run Jest
```bash
yarn jest
```
