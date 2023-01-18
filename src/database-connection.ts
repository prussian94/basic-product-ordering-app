/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
import config from "./config";

const mongoose = require("mongoose");
let connectionString = config.MONGO_URI;

mongoose.set("debug", true);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch(console.log);

module.exports = mongoose.connection;
