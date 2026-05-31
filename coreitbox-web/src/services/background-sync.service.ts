import {
  getQueue,
  removeQueue,
} from "@/lib/sync-queue";

import {
  TicketsService,
} from "@/services/tickets.service";

export async function syncPendingActions() {
  const queue =
    await getQueue();

  if (!queue.length) {
    return;
  }

  console.log(
    "SYNCING",
    queue.length,
    "ITEMS",
  );

  for (const item of queue) {
    try {
      switch (
        item.type
      ) {
        case "CREATE_TICKET":
          await TicketsService.create(
            item.payload,
          );
          break;

        default:
          break;
      }

      await removeQueue(
        item.id!,
      );

      console.log(
        "SYNC SUCCESS",
        item.id,
      );
    } catch (error) {
      console.error(
        "SYNC FAILED",
        item.id,
        error,
      );
    }
  }
}