const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 8080;
var cors = require("cors");

app.use(cors());

// Connect Database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/user/card-collection", require("./routes/api/collection"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
