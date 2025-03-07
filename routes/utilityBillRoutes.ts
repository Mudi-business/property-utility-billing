"use strict";
import express, { Request, Response } from "express";
const router = express.Router();
// const auth = require("../auth/auth");
// const Protect = require("../auth/protectRoutesAuth");

router.get(
  "/utility/billing/pageable",
  //   auth,
  //   Protect(),
  async (req: Request, res: Response) => {
    // #swagger.tags = ['UtilityBill']
    // #swagger.summary = 'Utility Bills..'
    // #swagger.description = 'Utility bills pageable...'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /*  #swagger.parameters['page'] = {
            in: 'query',
            description: 'Page Number',
            required: 'true',
            type: 'number',
            value: "0"
    } */
    /*  #swagger.parameters['size'] = {
            in: 'query',
            description: 'Page Size',
            required: 'true',
            type: 'number',
            value: "10"
    } */
    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/ResponseUtilityPageable" },
            description: 'OK' 
    } */
    console.log("cool", req, res);
  }
);

router.get(
  "/utility/billing/:id",
  //   auth,
  //   Protect(),
  (req: Request, res: Response) => {
    // #swagger.tags = ['UtilityBill']
    // #swagger.summary = 'Get Utility Bill By Id..'
    // #swagger.description = 'Get Utility Bill By Id.'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //  #swagger.parameters['id'] = { description: 'Utility Bill Id' }
    /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/ResponseUtilityBill" },
               description: 'OK' 
        } */
    console.log("cool", req, res);
  }
);

router.post(
  "/utility/billing",
  // auth,
  //  Protect(),
  (req: Request, res: Response) => {
    // #swagger.tags = ['UtilityBill']
    // #swagger.summary = 'Create Utility Bill..'
    // #swagger.description = 'Create Utility Bill.'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/RequestUtilityBill" }
  } */
    /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/ResponseUtilityBill" },
               description: 'OK' 
        } */
    // console.log("headers :", req.headers);
    console.log("cool", req, res);
  }
);

module.exports = router;
