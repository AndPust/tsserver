process.loadEnvFile()

import type { MigrationConfig } from "drizzle-orm/migrator";

type APIConfig = {
  fileserverHits: number;
  db: DBConfig;
  platform: string;
  token: string;
};

type DBConfig  = {
  dbURL: string;
  migrationConfig: MigrationConfig
}

export var config: APIConfig = {
    fileserverHits: 0,
    db:  {
      dbURL: envOrThrow("DB_URL"),
      migrationConfig: {
        migrationsFolder: "./src/db/base_migration"
      }
    },
    platform: envOrThrow("PLATFORM"),
    token: envOrThrow("TOKEN")
}

function envOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not found`);
  }
  return value;
}