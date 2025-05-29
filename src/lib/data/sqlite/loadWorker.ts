import { WorkerMessageTypes, type WorkerMessage } from '$lib/data/sqlite/types';

// import the worker script
const workerImp = await import('./worker.ts?worker');

export default function initWorker() {
  const worker = new workerImp.default();

  const msg: WorkerMessage = { type: WorkerMessageTypes.INIT_DB };
  console.log(`Sending message to worker:`, msg);
  worker.postMessage(msg);

  worker.addEventListener(
    'message',
    async ({ data }: { data: WorkerMessage }) => {
      console.log('Received message from worker:', data.type);
    }
  );
}