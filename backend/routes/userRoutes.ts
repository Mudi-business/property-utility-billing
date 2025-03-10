"use strict";
import express, { Request, Response } from "express";
import { Container } from "typedi";
import { UserService } from "../services/userService";
const router = express.Router();
const userInstance = Container.get(UserService);
const auth = require("../auth/auth");
const Protect = require("../auth/protect");

// Since We use swagger-autogen for out Api Documentation that help us performing our Api Test easily
// Below is our swagger comments that demonstrate how to map our routes with swagger


// Below are Our User Routes with Typedi User Service Injection
router.get("/user/:id", auth, Protect(), (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get User By Id..'
  // #swagger.description = 'Get User By Id.'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  //  #swagger.parameters['id'] = { description: 'User Id' }
  /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/ResponseUser" },
               description: 'OK' 
        } */
  userInstance.getUserById(req, res);
});

router.post("/user", auth, Protect(), (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Create User..'
  // #swagger.description = 'Create User.'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/RequestUser" }
  } */
  /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/ResponseUser" },
               description: 'OK' 
        } */
  // console.log("headers :", req.headers);
  userInstance.saveUser(req, res);
});

module.exports = router;
