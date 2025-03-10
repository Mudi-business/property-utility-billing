import { Request, Response } from "express";
import { tokenSuccessDto } from "../dto/tokenDto";
import { TokenGrantsEnum } from "../enums/token";
import { HttpStatusCode } from "axios";
const jwt = require("jsonwebtoken");

//protect middleware is a middleware that we intercept 
// in order to check if the authorizatin header is from our issuer
module.exports = () => {
  return async (req: Request, res: Response, next: Function) => {
    try {
      const { authorization }: any = req?.headers;
      const token = authorization?.split(" ")[1];
      var decoded: tokenSuccessDto = await jwt.verify(
        token,
        process.env.SECRET
      );
      if (decoded.jti === TokenGrantsEnum.access_token || decoded.jti === TokenGrantsEnum.refresh_token) {
        if (decoded.aud == process.env.TOKEN_AUDIENCE) {
          next();
        } else {
          res.status(HttpStatusCode.Unauthorized).send({
            status: HttpStatusCode.Unauthorized,
            message: "UnAuthorized",
          });
        }
      } else {
        res.status(HttpStatusCode.Unauthorized).send({
          status: HttpStatusCode.Unauthorized,
          message: "UnAuthorized",
        });
      }
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.status(HttpStatusCode.Unauthorized).send({
          status: HttpStatusCode.Unauthorized,
          message: "UnAuthorized",
        });
      } else {
        res.status(HttpStatusCode.Unauthorized).send({
          status: HttpStatusCode.InternalServerError,
          message: error?.name,
        });
      }
    }
  };
};
