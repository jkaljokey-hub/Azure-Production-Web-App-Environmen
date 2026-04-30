const express = require("express");

const app = express(); // ✅ FIRST create app

app.use(express.json()); // ✅ THEN use it

// routes
const messageRoutes = require("./api/message");
app.use("/api", messageRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});