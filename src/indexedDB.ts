import { openDB } from "idb";
import type { IncidentFormSchema } from "./Components/Ocorrencias";
const DB_NAME = "incidentFormDB";
const STORE_NAME = "incidents";

export type IncidentRecord = Omit<IncidentFormSchema, "id">;

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}
export async function saveIncident(data: IncidentRecord): Promise<IDBValidKey> {
  const db = await getDB();
  return db.add(STORE_NAME, data);
}

export async function getAllIncidents() {
  const db = await openDB(DB_NAME, 1);
  return db.getAll(STORE_NAME);
}
