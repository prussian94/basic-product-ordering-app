/* eslint-disable @typescript-eslint/no-var-requires */
const Exception = require("../models/Exception");

export default {
  unauthorized: new Exception({
    message: "You need to login.",
    code: 401,
    statusCode: 40100,
  }),
  forbidden: new Exception({
    message: "You are not allowed to access this resource.",
    code: 403,
    statusCode: 40300,
  }),
  userNotFound: new Exception({
    message: "User not found.",
    code: 404,
    statusCode: 40400,
  }),
  productNotFound: new Exception({
    message: "Product not found.",
    code: 404,
    statusCode: 40401,
  }),
  orderNotFound: new Exception({
    message: "Order not found.",
    code: 404,
    statusCode: 40402,
  }),
  invalidRequest: new Exception({
    message: "Invalid request.",
    code: 400,
    statusCode: 40000,
  }),
  exceedingStock: new Exception({
    message: "Exceeding stock.",
    code: 400,
    statusCode: 40001,
  }),
};
