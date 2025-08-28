const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: "db-postgresql-nyc3-89394-do-user-22973333-0.j.db.ondigitalocean.com",
  port: 25060,
  database: "defaultdb",
  user: "doadmin",
  password: "AVNS_8KyYVsHaIcFCsoAoLI5",
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("connect", () => {
  console.log("Connected to Digital Ocean PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = pool;
