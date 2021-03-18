import sleep, { SleepCancelled } from '../src';

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
