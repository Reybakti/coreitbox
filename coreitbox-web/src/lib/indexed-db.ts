import Dexie, {
  Table,
} from "dexie";

export interface PendingAction {
  id?: number;

  type: string;

  payload: any;

  createdAt: string;
}

class CoreITBoxDB extends Dexie {
  pendingActions!: Table<PendingAction>;

  constructor() {
    super("coreitbox-db");

    this.version(1).stores({
      pendingActions:
        "++id,type,createdAt",
    });
  }
}

export const db =
  new CoreITBoxDB();