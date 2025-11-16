import { Database } from "bun:sqlite";

/**
 * SQLite database client
 */
const createSqliteClient = (dbPath: string = ":memory:"): Database => {
  const db = new Database(dbPath);

  // Create users table if it doesn't exist
  const createTableStmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
  createTableStmt.run();

  return db;
};

export { createSqliteClient };
export type SqliteClient = ReturnType<typeof createSqliteClient>;
