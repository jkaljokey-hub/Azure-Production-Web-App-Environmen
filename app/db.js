const sql = require("mssql");
require("dotenv").config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log("✅ Connected to database");

    const result = await pool.request().query("SELECT GETDATE() AS now");
    console.log("📅 Server time:", result.recordset[0].now);

    return pool;
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
}

// 👇 THIS is the important part
connectDB();