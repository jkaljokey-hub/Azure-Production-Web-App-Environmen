const express = require("express");
const router = express.Router();
const connectDB = require("../db");

// ✅ ADD THIS ROUTE
router.get("/messages", async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM messages");

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
res.status(500).json({ error: err.message });  }
});

module.exports = router;