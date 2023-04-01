import HttpClient from './HttpClient';

class ScheduleHttpClient extends HttpClient {
  static queue = Promise.resolve();

  protected async fetch(input: RequestInfo | URL, init?: RequestInit) {
    const prevQueue = ScheduleHttpClient.queue;
    const newQueue = (async () => {
      await prevQueue;

      return super.fetch(input, init);
    })();

    return (ScheduleHttpClient.queue = newQueue);
  }
}

export default ScheduleHttpClient;
