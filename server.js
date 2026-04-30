const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "public")));

// routes
const messageRoutes = require("./api/message");
app.use("/api", messageRoutes);

// start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});