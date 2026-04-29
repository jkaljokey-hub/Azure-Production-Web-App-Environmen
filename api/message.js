const express = require("express");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.json({ message: "Hello Abubakar, your full-stack app is running!" });
});

module.exports = router;
