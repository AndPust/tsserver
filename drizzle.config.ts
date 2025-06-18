import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/schema.ts",
  out: "src/db/base_migration",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:J23@localhost:5432/chirpy?sslmode=disable",
  },
});