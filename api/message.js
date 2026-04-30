const express = require("express");
const router = express.Router();
const connectDB = require("../db");

router.post("/message", async (req, res) => {
  try {
    const { name, message } = req.body;

    const pool = await connectDB();

    await pool.request()
      .input("name", name)
      .input("message", message)
      .query(`
        INSERT INTO messages (name, message)
        VALUES (@name, @message)
      `);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data");
  }
});

module.exports = router;