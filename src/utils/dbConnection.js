const mongoose = require("mongoose");
require("dotenv").config();
module.exports = async () => {
  try {
    mongoose.connection.on("connecting", () => {
      console.log("Connecting to Database..");
    });
    mongoose.connection.on("connected", async () => {
      console.log("Database Connection Established");
    });
    mongoose.connection.on("disconnecting", () => {
      console.log("Disconnecting Database..");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from Database..");
    });

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    });
  } catch (error) {
    console.error(error, "Database Connection Failed, Server Shutting Down");
    process.exit(1);
  }
};
