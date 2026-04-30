const express = require("express");
app.use(express.json());
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontendd
app.use(express.static(path.join(__dirname, "public")));

// API route
const messageRoute = require("./api/message");
app.use("/api", messageRoute);

// Azure App Service uses PORT env variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
