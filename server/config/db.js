  const mysql = require("mysql");
  require("dotenv").config();

  const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  (async () => {
    try {
      await db.query("SELECT 1");
      console.log("✅ Connected to MySQL Database (pool is working)");
    } catch (err) {
      console.error("❌ MySQL connection test failed:", err.message);
      process.exit(1);
    }
  })();

  module.exports = db;
