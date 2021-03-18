import sleep from '../src';

(async function () {
  console.log('Sleeping at', Date.now());
  await sleep(2000);
  console.log('Woke at', Date.now());
})();
