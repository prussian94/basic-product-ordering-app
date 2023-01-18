/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
import config from "./src/config";

const express = require("express");
import cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = config.PORT || 3000;

require("./src/database-connection");

app.set("port", config.PORT);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("short"));

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const orderRouter = require("./src/routes/order-router");
const productRouter = require("./src/routes/product-router");

app.use("/orders", orderRouter);
app.use("/products", productRouter);
