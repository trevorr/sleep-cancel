# sleep-cancel: Cancellable sleep function for Typescript

[![npm](https://img.shields.io/npm/v/sleep-cancel)](https://www.npmjs.com/package/sleep-cancel)
[![CircleCI](https://img.shields.io/circleci/build/github/trevorr/sleep-cancel)](https://circleci.com/gh/trevorr/sleep-cancel)
[![Coverage Status](https://coveralls.io/repos/github/trevorr/sleep-cancel/badge.svg?branch=master)](https://coveralls.io/github/trevorr/sleep-cancel?branch=master)

A small, simple, promise-based, cancellable delay function for Typescript and Javascript.

## Installation

```sh
npm install sleep-cancel
```

## Basic Usage

```ts
import sleep from 'sleep-cancel';

(async function () {
  console.log('Sleeping at', Date.now());
  await sleep(2000);
  console.log('Woke at', Date.now());
})();
```

## Cancellation Usage

```ts
import sleep, { SleepCancelled } from 'sleep-cancel';

const promise = sleep(2000);

(async function () {
  console.log('Sleeping at', Date.now());
  try {
    await promise;
  } catch (e) {
    if (e instanceof SleepCancelled) {
      console.log('Sleep cancelled')
    } else {
      throw e;
    }
  } finally {
    console.log('Woke at', Date.now());
  }
})();

promise.cancel();
```

## License

`sleep-cancel` is available under the [ISC license](LICENSE).
