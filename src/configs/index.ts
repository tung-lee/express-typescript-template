const development = {
  app: {
    port: process.env.DEVELOPMENT_APP_PORT || 3000,
  },
  db: {
    connectionString:
      process.env.DEVELOPMENT_DB_URL ||
      "mongodb://admin:password@localhost:27017",
    name: process.env.DEVELOPMENT_DB_NAME || "dbDev",
  },
};

const production = {
  app: {
    port: process.env.PRODUCTION_APP_PORT || 3030,
  },
  db: {
    connectionString:
      process.env.PRODUCTION_DB_URL ||
      "mongodb://admin:password@localhost:27017",
    name: process.env.PRODUCTION_DB_NAME || "dbProd",
  },
};

const config = { production, development };
const env = process.env.NODE_ENV || "development";

export default config[env as keyof typeof config];
