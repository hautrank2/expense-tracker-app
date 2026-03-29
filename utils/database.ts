import { PlaceModel } from "@/types/place";
import * as SQLite from "expo-sqlite";

const dbPromise = SQLite.openDatabaseAsync("place-manage");

export async function initDb() {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      imgUrl TEXT NOT NULL,
      address TEXT NOT NULL,
      lng REAL NOT NULL,
      lat REAL NOT NULL
    );
  `);
}

export const PLACE_TABLE_NAME = "places";

export const placeDb = {
  addPlace: async (place: Omit<PlaceModel, "id">) => {
    const db = await dbPromise;
    const result = await db.runAsync(
      `INSERT INTO ${PLACE_TABLE_NAME} (title, imgUrl, address, lng, lat)
     VALUES (?, ?, ?, ?, ?)`,
      [place.title, place.imgUrl, place.address, place.lng, place.lat],
    );

    return result.lastInsertRowId;
  },

  getPlaces: async (page = 1, pageSize = 10) => {
    const db = await dbPromise;

    const safePage = Math.max(1, page);
    const safePageSize = Math.max(1, pageSize);
    const offset = (safePage - 1) * safePageSize;

    const items = await db.getAllAsync<PlaceModel>(
      `SELECT id, title, imgUrl, address, lng, lat
       FROM ${PLACE_TABLE_NAME}
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [safePageSize, offset],
    );

    const totalRow = await db.getFirstAsync<{ total: number }>(
      `SELECT COUNT(*) as total FROM places`,
    );

    const total = totalRow?.total ?? 0;

    return {
      items,
      page: safePage,
      pageSize: safePageSize,
      total,
      totalPage: Math.ceil(total / safePageSize),
    };
  },

  getById: async (id: number) => {
    const db = await dbPromise;
    const result = await db.getFirstAsync<PlaceModel>(
      `SELECT id, title, imgUrl, address, lng, lat FROM ${PLACE_TABLE_NAME} WHERE id = ?`,
      [id],
    );

    return result as PlaceModel;
  },

  deletePlace: async (id: number) => {
    const db = await dbPromise;
    const result = await db.runAsync(
      `DELETE FROM ${PLACE_TABLE_NAME} WHERE id = ?`,
      [id],
    );
    return result;
  },

  editPlace: async (id: number, place: Omit<PlaceModel, "id">) => {
    const db = await dbPromise;
    const result = await db.runAsync(
      `UPDATE ${PLACE_TABLE_NAME} SET title = ?, imgUrl = ?, address = ?, lng = ?, lat = ? WHERE id = ?`,
      [place.title, place.imgUrl, place.address, place.lng, place.lat, id],
    );
    return result;
  },
};
