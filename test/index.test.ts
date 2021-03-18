import { fail } from 'assert';
import { expect } from 'chai';
import sleep, { SleepCancelled } from '../src';

describe('sleep', function () {
  it('sleeps a tick', async function () {
    const start = Date.now();
    await sleep();
    const stop = Date.now();
    expect(stop - start).to.be.lessThan(100);
  });
  it('sleeps a second', async function () {
    this.slow(1100);
    const start = Date.now();
    await sleep(1000);
    const stop = Date.now();
    expect(stop - start).to.be.within(500, 1500);
  });
  it('cancels without rejection', async function () {
    const start = Date.now();
    const promise = sleep(10000);
    promise.cancel(false);
    await promise;
    const stop = Date.now();
    expect(stop - start).to.be.lessThan(100);
  });
  it('cancels with rejection by default', async function () {
    const start = Date.now();
    const promise = sleep(10000);
    promise.cancel();
    try {
      await promise;
      fail('rejection expected');
    } catch (e) {
      expect(e).to.be.an.instanceOf(SleepCancelled);
      const stop = Date.now();
      expect(stop - start).to.be.lessThan(100);
    }
  });
  it('cancels with rejection explicitly', async function () {
    const start = Date.now();
    const promise = sleep(10000);
    promise.cancel(true);
    try {
      await promise;
      fail('rejection expected');
    } catch (e) {
      expect(e).to.be.an.instanceOf(SleepCancelled);
      const stop = Date.now();
      expect(stop - start).to.be.lessThan(100);
    }
  });
});
