/* eslint-disable no-case-declarations */
import { WorkerMessageTypes, type WorkerMessage } from "$lib/data/sqlite/types";
import { initDb } from "./initDb";
(async function () {
  addEventListener(
    "message",
    async function ({ data }: { data: WorkerMessage }) {
      console.log("worker received message:", data.type);

      let res: WorkerMessage;

      switch (data.type) {
        case WorkerMessageTypes.INIT_DB:
          await import("../../sqlite/sqlite3.mjs");

          const initRes = await initDb();
          console.log("worker initDb result:", initRes);
          res = { type: WorkerMessageTypes.INIT_DB_RESPONSE };
          console.log("worker sending message back to main:", res);
          this.postMessage(res);
          break;

        default:
          throw new Error(`Unknown message type: ${data.type}`);
      }
    }
  );
})();
