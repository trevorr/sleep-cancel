export interface SleepResult extends Promise<void> {
  cancel(withRejection?: boolean): void;
}

export class SleepCancelled extends Error {
  constructor() {
    super('sleep() was cancelled');
    this.name = 'SleepCancelled';
  }
}

export default function sleep(ms = 0): SleepResult {
  let cancel;
  const result = new Promise((resolve, reject): void => {
    const timeout = setTimeout(resolve, ms);
    cancel = (withRejection = true) => {
      clearTimeout(timeout);
      if (withRejection) {
        reject(new SleepCancelled());
      } else {
        resolve();
      }
    };
  }) as SleepResult;
  // TypeScript doesn't realize that Promise executors run synchronously
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (result as any).cancel = cancel;
  return result;
}
