const express = require("express");
const app = express();
const user = require("./routes/user");
const dbConnection = require("./utils/dbConnection");
require("dotenv").config();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Request and Response Logs */
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(
      `HTTP->: ${req.method} - Url:[${req.originalUrl}] - IP:[${req.socket.remoteAddress}] - Status:[${res.statusCode}] `
    );
  });
  next();
});

/* Routes */
app.use("/user", user);

/* ping route */
app.get("/ping", (req, res, next) => {
  res.status(200).json({ response: "Server is Running..." });
});

/* Error Handling */
app.use((req, res, next) => {
  const error = new Error("No Routes");
  return res.status(400).json({ message: error.message });
});

/* Starting Server */
try {
  const startServer = async () => {
    await dbConnection();
    app.listen(process.env.SERVER_PORT || 4000, () => {
      console.log(
        `Server Listening on Port ${process.env.SERVER_PORT || 4000}`
      );
      console.log(" ");
    });
  };
  startServer();
} catch (error) {
  console.error({ error: error.message });
  process.exit(1);
}
