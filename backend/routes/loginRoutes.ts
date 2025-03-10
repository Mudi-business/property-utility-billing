"use strict";
import express, { Request, Response } from "express";
import { Container } from "typedi";
import { LoginService } from "../services/loginService";
import { UserResponseDto } from "../dto/user";
import { AxiosError, HttpStatusCode } from "axios";
const router = express.Router();
const loginInstance = Container.get(LoginService);
const auth = require("../auth/auth");
const Protect = require("../auth/protect");

// Since We use swagger-autogen for out Api Documentation that help us performing our Api Test easily
// Below is our swagger comments that demonstrate how to map our routes with swagger


// Below are Our Login Routes with Typedi Login Service Injection
router.post("/login", (req: Request, res: Response) => {
  // #swagger.tags = ['Login']
  // #swagger.summary = 'Login User..'
  // #swagger.description = 'Login User.'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/RequestLogin" }
  } */
  /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/ResponseLogin" },
               description: 'OK' 
        } */
  // console.log("headers :", req.headers);
  loginInstance
    .validateUser(req, res)
    .then((response: any) => {
      const user: UserResponseDto = response;
      if (user !== undefined) {
        loginInstance.login(res, user);
      } else {
        res.status(HttpStatusCode.NotFound).send({
          status: HttpStatusCode.NotFound,
          message: "Wrong username or password",
        });
      }
    })
    .catch((error: AxiosError) => {
      if (error !== undefined) {
        res.status(HttpStatusCode.InternalServerError).send({
          status: HttpStatusCode.InternalServerError,
          message: error?.name,
        });
      } else {
        res.status(HttpStatusCode.NotFound).send({
          status: HttpStatusCode.NotFound,
          message: "Wrong username or password",
        });
      }
    });
});

router.post(
  "/refresh/token",
  auth,
  Protect(),
  (req: Request, res: Response) => {
    // #swagger.tags = ['Login']
    // #swagger.summary = 'Refresh Token ..'
    // #swagger.description = 'Refresh Token.'
    /* #swagger.security = [{
              "bearerAuth": []
      }] */
    /*	#swagger.requestBody = {
              required: true,
              schema: { $ref: "#/definitions/RequestRefreshToken" }
    } */
    /* #swagger.responses[200] = { 
                 schema: { $ref: "#/definitions/ResponseLogin" },
                 description: 'OK' 
          } */
    // console.log("headers :", req.headers);
    loginInstance.refresh_token(req, res);
  }
);

module.exports = router;
