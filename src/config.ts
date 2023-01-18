/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

export default {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  DEFAULT_PAGE_SIZE: Number(process.env.DEFAULT_PAGE_SIZE) || 10,
};
