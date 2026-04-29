const express = require("express");
const connectDB = require("./db");

const app = express();

app.get("/test", async (req, res) => {
  const pool = await connectDB();
  const result = await pool.request().query("SELECT 1 as test");
  res.json(result.recordset);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running"));