
import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
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