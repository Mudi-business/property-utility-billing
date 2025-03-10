
import { HttpStatusCode } from "axios";
import { Request, Response } from "express";

//An auth middleware is a middleware we use to intercept in order to check if authorizatin header is being passed
// in all routes that demands authentication
module.exports = (req: Request, res: Response, next: Function) => {
  try {
    if (req?.headers?.authorization != undefined) {
      next();
    } else res.sendStatus(HttpStatusCode.Unauthorized).json({ error: new Error("un Authorized") });
  } catch {
    res.sendStatus(HttpStatusCode.Unauthorized).json({
      error: "un Authorized",
    });
  }
};