/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const Exception = require("../models/exception");

function routeHandler(func: any) {
  return async function (req: any, res: any, next: any) {
    try {
      const response = await func(req, res, next);

      if (response) return res.json(response);
    } catch (err) {
      errorHandler(err, res);
    }
  };
}

function errorHandler(err: any, res: any) {
  if (err instanceof Exception) {
    return res.status(err.code).json({ error: err.message });
  }
  return res.status(500).json({ error: err.message });
}

module.exports = routeHandler;
