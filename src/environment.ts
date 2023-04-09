const { DB_URL, PORT } = process.env;

const DEFAULT_DB_URL = `postgres://postgres:postgres@localhost:5432/postgres`;

export const environment = {
  DB_URL: DB_URL || DEFAULT_DB_URL,
  PORT: PORT || 3000,
};
