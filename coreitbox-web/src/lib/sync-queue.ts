import {
  db,
} from "./indexed-db";

export async function addToQueue(
  type: string,
  payload: any,
) {
  await db.pendingActions.add({
    type,
    payload,
    createdAt:
      new Date().toISOString(),
  });
}

export async function getQueue() {
  return db.pendingActions.toArray();
}

export async function removeQueue(
  id: number,
) {
  return db.pendingActions.delete(id);
}