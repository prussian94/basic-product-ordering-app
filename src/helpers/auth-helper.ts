/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as TokenRepository from "../repository/token-repository";
const Exceptions = require("../exceptions/exceptions");

export function authMiddleware() {
  return async function (req: any, res: any, next: any) {
    if (!req.headers["x-auth-token"])
      return res
        .status(Exceptions.unauthorized.code)
        .json({ error: Exceptions.unauthorized.message });

    const token = req.headers["authorization"].split("Bearer ")[1];
    const user = await TokenRepository.get(token);
    if (!user) {
      return res
        .status(Exceptions.unauthorized.code)
        .json({ error: Exceptions.unauthorized.message });
    }

    return next();
  };
}
